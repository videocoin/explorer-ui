import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const lTimeAgo = new TimeAgo('en-US');

function timeAgo(date: string | number): string {
  return lTimeAgo
    .format(new Date(date), { flavour: 'short' })
    .split('.')
    .join('');
}

export default timeAgo;
