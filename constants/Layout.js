import { Dimensions } from 'react-native';

const dayList = ['일', '월', '화', '수', '목', '금', '토'];

const newDate = new Date();
const day = newDate.getDay();
const date = newDate.getDate();
const month = newDate.getMonth() + 1;
const year = newDate.getFullYear();

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height
  },
  fullDay: {
    year,
    month,
    date,
    day: dayList[day]
  },
  isSmallDevice: width < 375
};
