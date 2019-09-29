import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import { Image, Rating, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import logoIcon from '../assets/images/logo.png';
import Colors from '../constants/Colors';
/* TabView */
import { TabView, TabBar } from 'react-native-tab-view';
import LocInfo from './LocInfo';
import LocComment from './LocComment';
/* Firebase */
import firebase from 'firebase/app';
import { firebaseApp, ContextSet } from '../firebase';
/* Image */
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const { white, black, focusGreen, lightGray, textColor } = Colors;

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
        backgroundColor: focusGreen,
        height: 3,
        borderRadius: 30
      }}
      tabStyle={styles.bubble}
      renderLabel={({ route, focused }) => {
        const color = focused ? textColor : lightGray;
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
        style={{ flex: 1 }}
      >
        <View style={styles.picBox}>
          <View style={styles.header}>
            <View style={styles.left}>
              <Icon
                name="arrow-back"
                size={30}
                color={white}
                onPress={() => {
                  if (isHome) setIsHomeDetail(false);
                  setIsDetail(false);
                }}
                style={{ paddingRight: 120 }}
              />
            </View>
            <Image source={logoIcon} style={{ width: 70, height: 70 }} />
            <View style={styles.right}></View>
          </View>
          <View
            style={{
              flex: 7
            }}
          >
            <Text style={styles.title}>{contentTitle.current}</Text>
            <Image
              source={{
                uri:
                  'https://firebasestorage.googleapis.com/v0/b/media-e6082.appspot.com/o/photos%2Fphoto%2Fcat.jpg?alt=media&token=accdd002-422b-4fe5-b505-4b642cc5b780'
              }}
              containerStyle={{ borderRadius: 45, overflow: 'hidden' }}
              style={{ width: width - 60, height: 170 }}
            ></Image>
            <View
              style={{
                paddingTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <AntDesign color="white" size={30} name="star"></AntDesign>
                <Text style={styles.text}>{rating.current}</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <MaterialIcons
                  color="white"
                  size={30}
                  name="bookmark-border"
                ></MaterialIcons>
                <Text style={styles.text}>즐겨찾기</Text>
              </View>
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
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30
  },
  header: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingBottom: 0
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  infoBox: {
    flex: 1
  },
  input: {
    paddingTop: 30
  },
  title: {
    fontSize: 20,
    fontFamily: 'BMDOHYEON',
    color: textColor,
    paddingLeft: 10,
    paddingVertical: 6,
    justifyContent: 'flex-start',
    paddingTop: 0
  },
  text: {
    paddingLeft: 4,
    fontFamily: 'BMDOHYEON',
    color: textColor
  }
});

ContentDetailScreen.navigationOptions = {
  header: null
};
