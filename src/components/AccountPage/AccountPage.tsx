import React, { ReactElement, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TopBar, Typography } from 'ui-kit/src';
import Search from 'components/Search';
import BackLink from 'components/BackLink';
import css from './styles.module.scss';
import { fetchAccount } from 'api/api';
import {
  Account,
  setAccount,
  getAccount,
  ReduxStore,
  SetAccountAction
} from 'store';
import { connect } from 'react-redux';

interface PathParamsType {
  hash: string;
}

interface StateProps {
  account: Account;
}

interface DispatchProps {
  setAccount: (payload: Account) => SetAccountAction;
}

type AccountPageProps = StateProps & DispatchProps;

const AccountPage = ({
  match,
  setAccount,
  account
}: RouteComponentProps<PathParamsType> & AccountPageProps): ReactElement => {
  const { hash } = match.params;
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetchAccount(hash);
        const { account } = res.data;

        if (account) {
          setAccount(account);
        } else {
          throw new Error('Error');
        }
      } catch (e) {
        console.log('ERROR', e.response);
      }
    };
    fetchData();
    return () => {
      setAccount(null);
    };
  }, [hash, setAccount]);

  if (!account) return null;

  const { balance } = account;

  return (
    <div>
      <div className="topBar">
        <TopBar>
          <BackLink to="/blocks" />
          <div>
            <Typography type="caption">VideoCoin Network</Typography>
            <Typography type="smallTitle">Account</Typography>
          </div>
          <Search />
        </TopBar>
      </div>
      <div className="content">
        <div className={css.head}>
          <div>
            <Typography
              type="subtitleAlt"
              theme="white"
              weight="medium"
              className={css.balance}
            >
              {balance} VID
            </Typography>
          </div>
          <Typography type="subtitleAlt" theme="white" weight="medium">
            {hash}
          </Typography>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxStore): StateProps => ({
  account: getAccount(state)
});

const dispatchProps = {
  setAccount
};

export default connect(
  mapStateToProps,
  dispatchProps
)(withRouter(AccountPage));
