import React, {
  memo,
  ReactElement,
  ReactNode,
  useCallback,
  useState
} from 'react';
import cn from 'classnames';
import { Field, Table, Typography } from 'ui-kit';
import { Worker } from 'types/common';
import css from './styles.module.scss';
import { useBreakpoint } from 'components/BreakpointProvider';
import { readableWorkerStatus } from 'const';
import AddressModal from './AddressModal';

const fields: Field[] = [
  {
    name: 'status',
    label: 'Status'
  },
  {
    name: 'name',
    label: 'Name'
  },
  {
    name: 'selfStake',
    label: 'Direct Stake'
  },
  {
    name: 'delegatedStake',
    label: 'Delegated Stake'
  },
  {
    name: 'totalStake',
    label: 'Total Stake'
  },
  {
    name: 'address',
    label: 'Staking Address'
  }
];

const WorkersTable = ({ data }: { data: Worker[] }): ReactElement => {
  const [address, setAddress] = useState<null | string>(null);

  const handleCloseAddressModal = () => setAddress(null);
  const { md } = useBreakpoint();
  const renderRow = useCallback(
    (row: Worker): ReactNode => {
      const {
        id,
        name,
        status,
        selfStake,
        delegatedStake,
        totalStake,
        isInternal,
        address
      } = row;
      console.log(row.address);
      const handleOpenAddressModal = () => {
        console.log(address);
        setAddress(address);
      };
      if (md) {
        return (
          <tr key={row.id} className={css.row}>
            <td>
              <div className={css.status}>
                <div className={cn(css.statusMark, css[status])} />
              </div>
            </td>
            <td>
              <Typography type="smallBody">{name}</Typography>
            </td>
            <td>
              <div className={css.status}>{readableWorkerStatus[status]}</div>
            </td>
            <td>
              <div>
                {isInternal ? <span className={css.self} /> : selfStake}
              </div>
            </td>
            <td>
              <div>
                {isInternal ? <span className={css.self} /> : delegatedStake}
              </div>
            </td>
            <td>
              <div>
                {!isInternal ? <span className={css.self} /> : totalStake}
              </div>
            </td>
          </tr>
        );
      }
      return (
        <tr key={id} className={css.row}>
          <td>
            <div className={css.status}>
              <div className={cn(css.statusMark, css[status])} />
              <Typography type="tiny">{status.toLowerCase()}</Typography>
            </div>
          </td>
          <td>
            <Typography type="body">{name}</Typography>
          </td>
          <td>
            <div>{isInternal ? <span className={css.self} /> : selfStake}</div>
          </td>
          <td>
            <div>
              {isInternal ? <span className={css.self} /> : delegatedStake}
            </div>
          </td>
          <td>
            <div>{isInternal ? <span className={css.self} /> : totalStake}</div>
          </td>
          <td align="center">
            {address && !isInternal ? (
              <button type="button" onClick={handleOpenAddressModal}>
                <Typography theme="sunkissed" weight="medium">
                  View Address
                </Typography>
              </button>
            ) : (
              <Typography>—</Typography>
            )}
          </td>
        </tr>
      );
    },
    [md]
  );
  return (
    <div className={css.table}>
      <Table fields={fields} data={data} renderRow={renderRow} />
      {address && (
        <AddressModal closeModal={handleCloseAddressModal} address={address} />
      )}
    </div>
  );
};

export default memo(WorkersTable);
