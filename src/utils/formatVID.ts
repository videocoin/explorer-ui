import numeral from 'numeral';
function round(num, digest): number {
  const n = Math.pow(digest, -1);
  return Math.floor(num * n) / n;
}

function formatVID(val: number | string): number | string {
  if (val < 0.001) return 0;
  if (val < 1) {
    return val.toFixed(3);
  }
  if (val < 999) {
    return val;
  }
  if (val < 10_000) {
    return numeral(round(val, 10)).format('0.0 a');
  }
  if (val < 100_000) {
    return numeral(round(val, 100)).format('0.0 a');
  }
  if (val < 999_999) {
    return numeral(round(val, 1_000)).format('0 a');
  }
  if (val < 10_000_000) {
    return numeral(round(val, 10_000)).format('0 a');
  }
  return numeral(round(val, 1_000_000).format('0 a'));
}

export default formatVID;
