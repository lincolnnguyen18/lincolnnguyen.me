import React from 'react';
import { useSelector } from 'react-redux';
import { transcribeSelector } from '../../../slices/transcribeSlice';
import { userGqlClient } from '../../../gqlClients/userGqlClient';

export function SyncTranscriberSettings () {
  const { transcribeLang, translateLang, cutOffType, playbackSpeed } = useSelector(transcribeSelector);

  React.useEffect(() => {
    userGqlClient.updateUser({ transcribeLang });
  }, [transcribeLang]);

  React.useEffect(() => {
    userGqlClient.updateUser({ translateLang });
  }, [translateLang]);

  React.useEffect(() => {
    userGqlClient.updateUser({ transcribeCutOffType: cutOffType });
  }, [cutOffType]);

  React.useEffect(() => {
    userGqlClient.updateUser({ playbackSpeed });
  }, [playbackSpeed]);

  return (
    <></>
  );
}