import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Image, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
/* TabView */
import { TabView, TabViewAnimated, TabBar } from 'react-native-tab-view';
import LocInfo from './LocInfo';
import LocComment from './LocComment';
/* Firebase */
import firebase from 'firebase/app';
import { firebaseApp, ContextSet } from '../firebase';

const BLACK = '#000';
const GREEN = '#7dcaac';
const LIGHT_GRAY = '#D3D3D3';

export default function ContentDetailScreen({ detailInfo }) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(undefined);
  const [reLoad, setReLoad] = useState(false);
  const contentTitle = useRef('');
  /* TabView */
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    { key: 'first', title: '장소정보' },
    { key: 'second', title: '장소후기' }
  ]);
  /* Firebase */
  const [auth, users, contents] = firebaseApp();
  const [data, setData] = useContext(ContextSet.DataContext);

  /* TabView */
  const renderScene = ({ route }) => {
    if (!route.key) return null;

    if (route.key === 'first') {
      return <LocInfo type="active" />;
    }

    if (route.key === 'second') {
      return (
        <LocComment
          type="inactive"
          comment={comment}
          setComment={setComment}
          handleOnComment={handleOnComment}
          commentList={commentList}
        />
      );
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      style={{ backgroundColor: 'white' }}
      indicatorStyle={{
        backgroundColor: GREEN,
        height: 3,
        borderRadius: 30
      }}
      tabStyle={styles.bubble}
      renderLabel={({ route, focused }) => {
        const color = focused ? BLACK : LIGHT_GRAY;
        return <Text style={{ color, margin: 8 }}>{route.title}</Text>;
      }}
    />
  );

  // 댓글을 입력할 때 실행
  const handleOnComment = () => {
    const com = { id: JSON.stringify(data.userName), comment };
    contents.doc(detailInfo).update({
      comments: firebase.firestore.FieldValue.arrayUnion(com)
    });
    setComment('');
    setReLoad(!reLoad);
  };

  useEffect(() => {
    contents
      .doc(detailInfo)
      .get()
      .then(doc => {
        contentTitle.current = doc.data().title;
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
        <Text>{contentTitle.current}</Text>
        <Image
          source={{
            uri:
              'https://firebasestorage.googleapis.com/v0/b/media-e6082.appspot.com/o/photos%2Fphoto%2Fdog.png?alt=media&token=accdd002-422b-4fe5-b505-4b642cc5b780'
          }}
          containerStyle={{ borderRadius: 25, overflow: 'hidden' }}
          style={{ width: 200, height: 200 }}
        ></Image>
      </LinearGradient>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        style={styles.infoBox}
        onIndexChange={idx => setIndex(idx)}
        renderTabBar={renderTabBar}
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
  infoBox: {
    flex: 5
  },
  input: {
    paddingTop: 30
  },
  label: {
    color: 'black'
  }
});

ContentDetailScreen.navigationOptions = {
  header: null
};
