import { eq } from 'lodash/fp';

function formatBytes(bytes: number | string): string {
  if (!bytes && !eq(0, +bytes)) {
    return '0';
  }

  return (+bytes / 1e9).toFixed(2);
}

export default formatBytes;
