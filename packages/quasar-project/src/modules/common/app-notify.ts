import { CatchError } from '@placements/common';
import { ICONS } from '@placements/core/ui';
import { Notify, QNotifyCreateOptions } from 'quasar';
import { i18n } from '../../boot/i18n';
const { t: $t } = i18n.global;

const NOTIFY_DEFAULT_POSITION = 'bottom';
const successObj: QNotifyCreateOptions = {
  color: 'positive',
  position: NOTIFY_DEFAULT_POSITION,
  message: '',
  icon: ICONS.CHECK,
};

const negativeObj: QNotifyCreateOptions = {
  color: 'negative',
  position: NOTIFY_DEFAULT_POSITION,
  message: '',
  icon: ICONS.ATTENTION,
};
const infoObj: QNotifyCreateOptions = {
  color: 'info',
  position: NOTIFY_DEFAULT_POSITION,
  message: '',
  icon: ICONS.INFO,
};

const notify = Notify;

export const toast = (
  message: string,
  type: 'positive' | 'negative' | 'info' = 'positive'
) => {
  let messageType = infoObj;
  switch (type) {
    case 'positive':
      messageType = { ...successObj, message };
      break;
    case 'negative':
      messageType = { ...negativeObj, message };
      break;
    case 'info':
      messageType = { ...infoObj, message };
      break;

    default:
      break;
  }

  if (notify) return notify.create(messageType);
};

export const showApiError = (error: CatchError) => {
  if (!error.response) {
    toast($t('common.networkErr'), 'negative');
  }

  return error?.response?.data;
};
