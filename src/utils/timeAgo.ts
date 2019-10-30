import formatDistanceStrict from 'date-fns/formatDistanceStrict';

function timeAgo(date: string): string {
  const today = new Date();
  return formatDistanceStrict(today, new Date(date));
}

export default timeAgo;
