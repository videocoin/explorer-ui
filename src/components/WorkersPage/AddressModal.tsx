import React from 'react';
import { ActionBar, Button, Typography, Modal, Overlay, Input } from 'ui-kit';
import useLockBodyScroll from 'hooks/useLockBodyScroll';
import usePortal from 'hooks/usePortal';
import { createPortal } from 'react-dom';
import './styles.module.scss';
import ClipboardPostfix from '../ClipboardPostfix';

const AddressModal = ({
  closeModal,
  address,
}: {
  closeModal: () => void;
  address: string;
}) => {
  const target = usePortal('modal-root');
  useLockBodyScroll();
  return createPortal(
    <Overlay onClick={closeModal}>
      <Modal>
        <div className="modalInner">
          <div className="mb30">
            <Input
              value={address}
              readOnly
              label="Staking address"
              postfix={() => <ClipboardPostfix text={address} />}
            />
          </div>
          <Typography align="center" className="mb10" type="body">
            Worker's Public Staking Address
          </Typography>
          <Typography align="center" className="mb45" type="smallBodyThin">
            Copy and use the address above to stake VID token onto <br />
            this worker node.
          </Typography>
        </div>
        <div className="modalActions">
          <ActionBar>
            <Button onClick={closeModal}>Close</Button>
          </ActionBar>
        </div>
      </Modal>
    </Overlay>,
    target
  );
};

export default AddressModal;
