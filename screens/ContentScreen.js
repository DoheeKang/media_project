import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import ContentList from './ContentList';
import ContentDetailScreen from './ContentDetailScreen';

export default function ContentScreen({ isHome, setIsHomeDetail }) {
  const [isDetail, setIsDetail] = useState(false);
  const detailInfo = useRef('');

  if (!isDetail) {
    return (
      <View style={{ flex: 1 }}>
        {isHome ? (
          <></>
        ) : (
          <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['#62cdaa', '#79d19b', '#90d392']}
            style={{ flex: 1 }}
          ></LinearGradient>
        )}
        <View style={{ flex: 7 }}>
          <ContentList
            detailInfo={detailInfo}
            isHome={isHome}
            setIsHomeDetail={setIsHomeDetail}
            setIsDetail={setIsDetail}
          ></ContentList>
        </View>
      </View>
    );
  } else {
    return (
      <ContentDetailScreen
        detailInfo={detailInfo.current}
        isHome={isHome}
        setIsHomeDetail={setIsHomeDetail}
        setIsDetail={setIsDetail}
      />
    );
  }
}

ContentScreen.navigationOptions = {
  header: null
};
