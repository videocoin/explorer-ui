import React from 'react';
import { FieldAction } from 'ui-kit';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import css from './styles.module.scss';
import { toast } from 'react-toastify';

const ClipboardPostfix = ({ text }: { text: string }) => {
  const handleCopy = () => {
    toast.success('Address has been copied to your clipboard');
  };

  return (
    <CopyToClipboard className={css.copy} text={text} onCopy={handleCopy}>
      <span>
        <FieldAction color="violet" icon="copy" />
      </span>
    </CopyToClipboard>
  );
};

export default ClipboardPostfix;
