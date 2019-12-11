import React, {
  FormEvent,
  ReactElement,
  useEffect,
  useRef,
  useState
} from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Icon, Input, Spinner } from 'ui-kit';
import css from './styles.module.scss';
import isTransaction from 'utils/isTransaction';
import { fetchAccount, fetchBlock, fetchTransaction } from 'api/api';
import isAddress from 'utils/isAddress';
import { useBreakpoint } from 'components/BreakpointProvider';
import useOnClickOutside from 'hooks/useOnclickOutside';

interface PathParamsType {
  hash: string;
}

const Search = ({
  history,
  match
}: RouteComponentProps<PathParamsType>): ReactElement => {
  const ref = useRef();
  const breakpoints = useBreakpoint();
  const [isVisible, setVisible] = useState(true);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (ref.current) {
      setVisible(!breakpoints.sm);
    }
    return () => {
      ref.current = null;
    };
  }, [breakpoints.sm]);
  const showSearch = (): void => setVisible(true);
  const hideSearch = (): void => setVisible(false);
  useOnClickOutside(ref, hideSearch, false, !breakpoints.sm);
  const onChange = (e: FormEvent<HTMLInputElement>): void =>
    setValue(e.currentTarget.value);
  const handleSearch = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (!value || match.params.hash === value) {
      setValue('');
      return;
    }
    const wrongValue = !isAddress(value) && !isTransaction(value);
    if (wrongValue) {
      history.push('/no-results');
      return;
    }
    setLoading(true);
    try {
      if (isAddress(value)) {
        const res = await fetchAccount(value);
        const { account } = res.data;
        if (account) {
          history.push(`/account/${value}`);
        } else {
          history.push('/no-results');
        }
      }
      if (isTransaction(value)) {
        const res = await fetchTransaction(value);
        const { transaction } = res.data;
        if (transaction) {
          history.push(`/transactions/${value}`);
        } else {
          const res = await fetchBlock(value);
          const { block } = res.data;
          if (block) {
            history.push(`/blocks/${value}`);
          } else {
            history.push('/no-results');
          }
        }
      }
    } catch (e) {
      history.push('/no-results');
    }
    setLoading(false);
  };

  return (
    <div className={css.root}>
      <button className={css.toggleBtn} onClick={showSearch}>
        <Icon name="search" />
      </button>
      {isVisible && (
        <form className={css.form} ref={ref} onSubmit={handleSearch}>
          <div className={css.input}>
            <Input
              autoFocus={breakpoints.sm}
              label={
                breakpoints.md
                  ? 'Search'
                  : 'Search by Blocks, Tx Hash, Stream Id, or Account'
              }
              value={value}
              placeholder="Block, Txn, Stream, or Account"
              onChange={onChange}
            />
          </div>
          <button className={css.btn} type="submit" disabled={!Boolean(value)}>
            {loading ? (
              <Spinner size="sm" type="inline" />
            ) : (
              <Icon name="search" />
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default withRouter(Search);
