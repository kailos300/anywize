import React, { Fragment, useState, useCallback } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useTranslation } from 'react-i18next';

const defaultOptions = {
  description: '',
  confirmationText: 'Yes',
  cancellationText: 'No',
  dialogProps: {},
  onClose: () => {
  },
  onCancel: () => {
  },
};

const withConfirm = WrappedComponent => props => {
  const { t } = useTranslation('common');
  const [onConfirm, setOnConfirm] = useState(null);
  const [options, setOptions] = useState(defaultOptions);
  const {
    description,
    confirmationText,
    cancellationText,
    dialogProps,
    onClose,
    onCancel,
  } = options;

  const handleClose = useCallback(() => {
    onClose();
    setOnConfirm(null);
  }, [onClose]);

  const handleCancel = useCallback(() => {
    onCancel();
    handleClose();
  }, [onCancel, handleClose]);

  const handleConfirm = useCallback(
    (...args) => {
      onConfirm(...args);
      handleClose();
    },
    [onConfirm, handleClose],
  );

  function confirm(onConfirm, options = {}) {
    setOnConfirm(() => onConfirm);
    setOptions({ ...defaultOptions, ...options });
  }

  return (
    <Fragment>
      <WrappedComponent {...props} confirm={confirm} />
      <Dialog
        fullWidth
        {...dialogProps}
        open={!!onConfirm}
        onClose={handleCancel}
      >
        <DialogTitle>{t('Confirm!')}</DialogTitle>
        {description && (
          <DialogContent>
            <p
              style={{ fontSize: '18px', color: 'rgba(0,0,0,0.6)', margin: 0 }}
              dangerouslySetInnerHTML={{ __html: t(description) }}
            />
          </DialogContent>
        )}

        <DialogActions>
          <Button style={{ color: 'red' }} onClick={handleCancel}>
            {t(cancellationText)}
          </Button>
          <Button
            color='secondary'
            className='anti-bootstrap-button'
            onClick={handleConfirm}
            autoFocus={true}
          >
            {t(confirmationText)}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default withConfirm;
