import { default as Avatar } from './Avatar';

export default {
  title: 'react-core/Avatar',
  component: Avatar,
};

export const Base = {
  args: {
    source: {
      uri: 'https://www.shareicon.net/data/512x512/2016/05/24/770117_people_512x512.png',
    },
    name: 'João',
    onPress: () => alert('onPress callback'),
    size: 'mega',
  },
};
