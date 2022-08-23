import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Button } from '@strapi/design-system/Button';
import { useCMEditViewDataManager } from '@strapi/helper-plugin';
import usePluginsQueryParams from '@strapi/admin/admin/src/content-manager/hooks/usePluginsQueryParams';
import CloudUpload from '@strapi/icons/CloudUpload';
import requests from '../../api';
import { LoadingIndicatorPage, useNotification } from '@strapi/helper-plugin';

const LiveButton = () => {
  const { modifiedData, layout } = useCMEditViewDataManager();
  const [isSaving, setIsSaving] = useState(false);
  const toggleNotification = useNotification();

  const {
    push,
    location: { pathname },
  } = useHistory();

  const { formatMessage } = useIntl();
  const pluginsQueryParams = usePluginsQueryParams();

  const handleLive = async () => {
    try {
      setIsSaving(true);
      const res = await requests.publishToLive({ pathname, ...modifiedData });
      setIsSaving(false);
      toggleNotification({
        type: 'success',
        message: 'Successfully published on live',
      });
    } catch (err) {
      setIsSaving(false);
      toggleNotification({
        type: 'success',
        message: 'Failed publishing on live',
      });
    }
  }

  const content = {
    id: 'live-button.components.live.button',
    defaultMessage: 'Publish to Live',
  }

  return (
    <>
      {
        modifiedData.id && modifiedData.env === 'test' &&
        <Button variant="secondary"
          startIcon={<CloudUpload />}
          onClick={handleLive}
          disabled={isSaving}
          loading={isSaving}
        >
          {formatMessage(content)}
        </Button>
      }
    </>
  )
}

export default LiveButton