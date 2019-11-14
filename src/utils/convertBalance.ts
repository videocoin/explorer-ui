export function convertToVID(value: string | number): number {
  return +(+value / 10 ** 18).toFixed(2);
}

export function convertToWEI(value: string | number): number {
  return +value * 10 ** 18;
}
