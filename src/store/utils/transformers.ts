import { reduce } from 'lodash';
import { Blocks, Block } from '../block';

export const transformBlocks = (blocks: Block[]): Blocks => {
  return reduce(
    blocks,
    function(result, value) {
      const newResult: Blocks = { ...result };
      newResult[value.hash] = value;
      return newResult;
    },
    {}
  );
};
