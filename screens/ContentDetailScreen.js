import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';
import Animated from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseApp, ContextSet } from '../firebase';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Image, Button } from 'react-native-elements';
import firebase from 'firebase/app';

export default function ContentDetailScreen(props) {
  const [auth, users, contents] = firebaseApp();
  const [comment, setComment] = useState(undefined);
  const [data, setData] = useContext(ContextSet.DataContext);
  const [reLoad, setReload] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'first', title: '장소정보' },
    { key: 'second', title: '장소후기' }
  ]);
  const [commentList, setCommentList] = useState(undefined);
  const title = useRef('');

  const FirstRoute = () => (
    <View style={styles.scene}>
      <Text>장소 정보</Text>
    </View>
  );

  const SecondRoute = () => (
    <View style={styles.commentBox}>
      <View style={styles.comment}>
        <TextInput
          onChangeText={e => setComment(e)}
          value={comment}
          style={{ flex: 1 }}
          placeholder="댓글을 입력하세요"
        ></TextInput>
        <Button
          title="입력"
          type="clear"
          titleStyle={{ color: '#7dcaac' }}
          onPress={handleOnComment}
        ></Button>
      </View>
      <ScrollView>{commentList}</ScrollView>
    </View>
  );

  const _handleIndexChange = index => setIndex(index);

  const _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 125 : 211
                )
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 202 : 211
                )
              })
            ),
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 172 : 211
                )
              })
            )
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setIndex(i)}
            >
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  const handleOnComment = () => {
    const com = { id: JSON.stringify(data.userName), comment };
    contents.doc(props.detailInfo).update({
      comments: firebase.firestore.FieldValue.arrayUnion(com)
    });
    setComment('');
    setReload(!reLoad);
  };

  useEffect(() => {
    contents
      .doc(props.detailInfo)
      .get()
      .then(function(doc) {
        title.current = doc.data().title;
        const dataList = doc.data().comments;
        setCommentList(
          dataList.map((info, idx) => (
            <Text key={idx}>
              {info.id} : {info.comment}
            </Text>
          ))
        );
      });
  }, [reLoad]);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={styles.picBox}
      >
        <Text>{title.current}</Text>
        <Button
          title="X"
          onPress={() => {
            if (props.isHome) props.setIsHomeDetail(false);
            props.setIsDetail(false);
          }}
        />
        <Image
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/media-e6082.appspot.com/o/photos%2Fphoto%2Fdog.png?alt=media&token=accdd002-422b-4fe5-b505-4b642cc5b780'
          }}
          containerStyle={{ borderRadius: 25, overflow: 'hidden' }}
          style={{ width: 200, height: 200 }}
        />
      </LinearGradient>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute
        })}
        style={styles.infoBox}
        renderTabBar={_renderTabBar}
        onIndexChange={_handleIndexChange}
        initialLayout={{ width: Dimensions.get('window').width }}
      ></TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  picBox: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    flexDirection: 'row'
  },
  tabItem: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 16
  },
  commentBox: {
    flex: 1
  },
  comment: {
    flexDirection: 'row',
    height: 50
  },
  infoBox: {
    flex: 5
  },
  scene: {
    flex: 1
  }
});

ContentDetailScreen.navigationOptions = {
  header: null
};
