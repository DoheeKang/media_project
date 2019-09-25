import React, { useRef, useState } from 'react';
import ContentList from './ContentList';
import ContetnDetailScreen from './ContentDetailScreen';
export default function ContentScreen(props) {
  const [isDetail, setIsDetail] = useState(false);
  const detailInfo = useRef('');

  if (!isDetail) {
    return (
      <ContentList
        detailInfo={detailInfo}
        setIsDetail={setIsDetail}
      ></ContentList>
    );
  } else {
    return (
      <ContetnDetailScreen
        detailInfo={detailInfo.current}
        setIsDetail={setIsDetail}
      />
    );
  }
}

ContentScreen.navigationOptions = {
  header: null
};
