import numeral from 'numeral';
function round(num: number, digest = 10): number {
  const n = Math.pow(digest, -1);
  return Math.floor(num * n) / n;
}

function formatVID(val: number | string): number | string {
  const numVal = +val;
  if (numVal < 0.001) return 0;
  if (numVal < 1) {
    return numVal.toFixed(3);
  }
  if (numVal < 999) {
    return numVal;
  }
  if (numVal < 10_000) {
    return numeral(round(numVal, 10)).format('0.0 a');
  }
  if (numVal < 100_000) {
    return numeral(round(numVal, 100)).format('0.0 a');
  }
  if (numVal < 999_999) {
    return numeral(round(numVal, 1_000)).format('0 a');
  }
  if (numVal < 10_000_000) {
    return numeral(round(numVal, 10_000)).format('0 a');
  }
  return numeral(round(numVal, 1_000_000)).format('0 a');
}

export default formatVID;
