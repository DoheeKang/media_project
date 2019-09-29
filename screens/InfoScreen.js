import React, { useEffect, useContext } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { Avatar, Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { firebaseApp, ContextSet } from '../firebase';

import { MaterialIcons } from '@expo/vector-icons';

import LogoutScreen from '../components/Logout';

const width = Dimensions.get('window').width;
const gray = '#f2f2f2';

export default function InfoScreen(props) {
  const [auth, users, contents] = firebaseApp();
  const [data, setData] = useContext(ContextSet.DataContext);

  useEffect(() => {
    if (!data) {
      props.navigation.navigate('Auth');
    } else {
    }
  }, [data]);

  // useEffect(() => {
  //   contents
  //     .doc(detailInfo)
  //     .get()
  //     .then(doc => {
  //       rating.current = doc.data().rating;
  //       count.current = doc.data().count;
  //       setcontentInfo({
  //         info: doc.data().info,
  //         facilities: doc.data().facilities,
  //         description: doc.data().description
  //       });
  //       contentTitle.current = doc.data().title;
  //       const dataList = doc.data().comments;
  //       setCommentList(
  //         dataList
  //           .map((info, idx) => {
  //             console.log(info);
  //             return (
  //               <View key={idx}>
  //                 <Rating imageSize={20} readonly startingValue={info.rating} />
  //                 <Text>{info.id}</Text>
  //                 <Text>{info.comment}</Text>
  //               </View>
  //             );
  //           })
  //           .reverse()
  //       );
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#62cdaa', '#79d19b', '#90d392']}
        style={{ flex: 1 }}
      ></LinearGradient>
      <View style={{ flex: 7 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Avatar size="large" rounded icon={{ name: 'person' }} />
          <Text>{data['userName']}님</Text>
        </View>
        <View style={{ width, height: 20, backgroundColor: gray }}></View>
        <View style={{ flex: 1 }}>
          <Text>내 정보</Text>
          <Divider style={{ height: 3, backgroundColor: gray }} />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View
              style={{
                flex: 2,
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10
              }}
            >
              <Text style={{ paddingVertical: 10 }}>E-MAIL</Text>
              <Text>닉네임</Text>
            </View>
            <View
              style={{
                flex: 3,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10
              }}
            >
              <Text style={{ paddingVertical: 10 }}>{data['email']}</Text>
              <Text>{data['userName']}</Text>
            </View>
          </View>
        </View>
        <View style={{ width, height: 20, backgroundColor: gray }}></View>
        <View style={{ flex: 2 }}>
          <MaterialIcons size={30} name="bookmark"></MaterialIcons>
          <Text>즐겨찾기</Text>
          <Divider style={{ height: 3, backgroundColor: gray }} />
        </View>
      </View>
      {/* <LogoutScreen /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

InfoScreen.navigationOptions = {
  header: null
};
