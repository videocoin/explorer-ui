function getTime(date: string): number {
  return new Date(date).getTime() / 1000;
}

export default getTime;
