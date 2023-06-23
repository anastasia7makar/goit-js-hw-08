import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const key = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.on(
  'timeupdate',
  throttle(function (currentTime) {
    window.localStorage.setItem(key, currentTime.seconds);
  }, 1000)
);

player.setCurrentTime(window.localStorage.getItem(key) ?? 0);

