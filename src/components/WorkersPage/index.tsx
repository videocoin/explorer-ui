import React from 'react';
import PageLayout from 'components/Common/PageLayout';
import css from './styles.module.scss';
import { Typography } from 'ui-kit';
import WorkersMap from './WorkersMap';
import WorkersTable from './WorkersTable';

const WorkersPage = () => {
  return (
    <PageLayout title="Worker Nodes">
      <div className={css.top}>
        <div className={css.left}>
          <div className={css.cards}>
            <div className={css.card}>
              <div>
                <Typography type="subtitle">2</Typography>{' '}
                <Typography>Active Worker Nodes</Typography>
              </div>
            </div>
            <div className={css.card}>
              <div>
                <Typography type="subtitle">35</Typography>{' '}
                <Typography>Total Worker Nodes</Typography>
              </div>
            </div>
          </div>
          <div className={css.leaderboard}>
            <div className={css.title}>
              <Typography type="subtitleCaps">Weekly Leaderboard</Typography>
            </div>
            <table>
              <tr>
                <td>
                  <Typography type="bodyThin">#1</Typography>
                </td>
                <td>
                  <Typography type="body">Lonely Beowolf</Typography>
                </td>
                <td>
                  <Typography tagName="span" type="body">
                    1,234
                  </Typography>
                  <Typography tagName="span" type="smallBodyThin">
                    VID Earned
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyThin">#2</Typography>
                </td>
                <td>
                  <Typography type="body">Lonely Beowolf</Typography>
                </td>
                <td>
                  <Typography tagName="span" type="body">
                    1,234
                  </Typography>
                  <Typography tagName="span" type="smallBodyThin">
                    VID Earned
                  </Typography>
                </td>
              </tr>
              <tr>
                <td>
                  <Typography type="bodyThin">#3</Typography>
                </td>
                <td>
                  <Typography type="body">Lonely Beowolf</Typography>
                </td>
                <td>
                  <Typography tagName="span" type="body">
                    1,234
                  </Typography>
                  <Typography tagName="span" type="smallBodyThin">
                    VID Earned
                  </Typography>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={css.right}>
          <WorkersMap />
        </div>
      </div>
      <div className={css.nodes}>
        <div className={css.title}>
          <Typography type="subtitleCaps">All worker nodes</Typography>
        </div>
        <WorkersTable data={[]} />
      </div>
    </PageLayout>
  );
};

export default WorkersPage;
