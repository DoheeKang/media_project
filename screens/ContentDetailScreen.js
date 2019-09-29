import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  KeyboardAvoidingView
} from 'react-native';
import { Image, Rating } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
/* TabView */
import { TabView, TabBar } from 'react-native-tab-view';
import LocInfo from './LocInfo';
import LocComment from './LocComment';
/* Firebase */
import firebase from 'firebase/app';
import { firebaseApp, ContextSet } from '../firebase';
/* Image */
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const BLACK = '#000';
const GREEN = '#7dcaac';
const LIGHT_GRAY = '#D3D3D3';

const width = Dimensions.get('window').width;

export default function ContentDetailScreen({
  detailInfo,
  isHome,
  setIsHomeDetail,
  setIsDetail
}) {
  const [comment, setComment] = useState('');
  const [commentList, setCommentList] = useState(undefined);
  const [contentInfo, setcontentInfo] = useState({
    info: '',
    facilities: {},
    description: ''
  });
  const [reLoad, setReLoad] = useState(false);
  const contentTitle = useRef('');
  const rating = useRef(0);
  const count = useRef(0);
  const commentRating = useRef('');
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
      return <LocInfo contentInfo={contentInfo} type="active" />;
    }

    if (route.key === 'second') {
      return (
        <LocComment
          type="inactive"
          comment={comment}
          commentRating={commentRating}
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
    const com = { id: data.userName, comment, rating: commentRating.current };
    rating.current = (
      (rating.current * count.current + commentRating.current) /
      ++count.current
    ).toFixed(1);
    contents.doc(detailInfo).update({
      comments: firebase.firestore.FieldValue.arrayUnion(com),
      rating: rating.current,
      count: count.current
    });
    setComment('');
    setReLoad(!reLoad);
  };

  useEffect(() => {
    contents
      .doc(detailInfo)
      .get()
      .then(doc => {
        rating.current = doc.data().rating;
        count.current = doc.data().count;
        setcontentInfo({
          info: doc.data().info,
          facilities: doc.data().facilities,
          description: doc.data().description
        });
        contentTitle.current = doc.data().title;
        const dataList = doc.data().comments;
        setCommentList(
          dataList
            .map((info, idx) => {
              console.log(info);
              return (
                <View key={idx}>
                  <Rating imageSize={20} readonly startingValue={info.rating} />
                  <Text>{info.id}</Text>
                  <Text>{info.comment}</Text>
                </View>
              );
            })
            .reverse()
        );
      });
  }, [reLoad]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      enabled
      keyboardVerticalOffset={10}
    >
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={styles.picBox}
      >
        <View
          style={{
            flex: 1,
            paddingLeft: 30,
            paddingRight: 30
          }}
        >
          <View
            style={{
              flex: 2,
              justifyContent: 'flex-end',
              marginBottom: 0,
              paddingBottom: 0
            }}
          >
            <TouchableHighlight
              onPress={() => {
                if (isHome) setIsHomeDetail(false);
                setIsDetail(false);
              }}
              underlayColor="white"
            >
              <MaterialIcons
                color="white"
                size={40}
                name="keyboard-backspace"
              ></MaterialIcons>
            </TouchableHighlight>
          </View>
          <View
            style={{
              flex: 7
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingLeft: 10,
                paddingVertical: 6,
                justifyContent: 'flex-start',
                paddingTop: 0
              }}
            >
              {contentTitle.current}
            </Text>
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/media-e6082.appspot.com/o/photos%2Fphoto%2Fcat.jpg?alt=media&token=accdd002-422b-4fe5-b505-4b642cc5b780'
              }}
              containerStyle={{ borderRadius: 45, overflow: 'hidden' }}
              style={{ width: width - 60, height: 170 }}
            ></Image>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign color="white" size={30} name="star"></AntDesign>
              <Text>{rating.current}</Text>
              <MaterialIcons
                color="white"
                size={30}
                name="bookmark-border"
              ></MaterialIcons>
              <Text>북마크</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        style={styles.infoBox}
        onIndexChange={idx => setIndex(idx)}
        renderTabBar={renderTabBar}
        initialLayout={{ width }}
      ></TabView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  picBox: {
    flex: 1
  },
  infoBox: {
    flex: 1
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
