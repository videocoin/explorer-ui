import timeAgo from './timeAgo';
import isAddress from './isAddress';
describe('Utils test', () => {
  it('Should correct return time ago', () => {
    const Today = new Date().toISOString();
    expect(timeAgo(Today)).toBe('now');
  });

  it('Should validate address', () => {
    expect(
      isAddress(
        '0x385f5171fcf8ed9327e365fe457d58eb03d9addbd485dde8d683bcbd2045e550'
      )
    ).toBeFalsy();
    expect(
      isAddress('0x419aB3069F85bB1386b74524EcD582545c31250b')
    ).toBeTruthy();
  });
});
