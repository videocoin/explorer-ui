import React, { ReactElement } from 'react';
import { map } from 'lodash/fp';
import css from './styles.module.scss';
import { Typography } from 'ui-kit';

interface InfoBlock {
  label: string;
  value: string;
}

const Block = ({ label, value }: InfoBlock): ReactElement => (
  <div className={css.infoBlock}>
    <Typography type="title" className={css.blockValue}>
      {value}
    </Typography>
    <Typography type="smallBody">{label}</Typography>
  </div>
);

const InfoBlocks = (): ReactElement => {
  const info: InfoBlock[] = [
    {
      value: '84569',
      label: 'Block Height',
    },
    {
      value: '124',
      label: 'Total Streams',
    },
    {
      value: '$0.45',
      label: 'per VID',
    },
    {
      value: '1.5M',
      label: 'Transactions',
    },
  ];
  const renderBlock = (block: InfoBlock): ReactElement => (
    <Block key={block.label} {...block} />
  );
  return <div className={css.infoBlocks}>{map(renderBlock)(info)}</div>;
};

export default InfoBlocks;
