import React, { useRef, useState } from 'react';
import ContentList from './ContentList';
import ContetnDetailScreen from './ContentDetailScreen';

export default function ContentScreen({ isHome, setIsHomeDetail }) {
  const [isDetail, setIsDetail] = useState(false);
  const detailInfo = useRef('');

  if (!isDetail) {
    return (
      <ContentList
        detailInfo={detailInfo}
        isHome={isHome}
        setIsHomeDetail={setIsHomeDetail}
        setIsDetail={setIsDetail}
      ></ContentList>
    );
  } else {
    return (
      <ContetnDetailScreen
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
