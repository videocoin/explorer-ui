function isTransaction(tx: string): boolean {
  if (!/^(0x)?[0-9a-f]{64}$/i.test(tx)) {
    return false;
  }
  return /^(0x)?[0-9a-f]{64}$/.test(tx) || /^(0x)?[0-9A-F]{64}$/.test(tx);
}

export default isTransaction;
