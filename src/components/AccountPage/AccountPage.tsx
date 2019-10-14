import React, { ReactElement, useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Spinner, Typography } from 'ui-kit';
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
import PageLayout from 'components/Common/PageLayout';

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

  if (!account)
    return (
      <div className="content">
        <Spinner />
      </div>
    );

  const { balance } = account;

  return (
    <PageLayout title="Account" backTo="/blocks">
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
    </PageLayout>
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
