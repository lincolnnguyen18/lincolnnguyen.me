import React from 'react';
import { StyledButton } from '../../../components/StyledButton';
import { languages } from '../../../common/data';
import { GroupDivider } from '../../../components/GroupDivider';
import { deleteTranscript, transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { wait } from '../../../common/timeUtils';
import { commonActions, commonSelector, openMenu } from '../../../slices/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Settings } from './Settings';
import { Info } from './Info';
import { Confirm } from '../../main/Confirm';

export function MoreMenu () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recorder, transcriber, transcribeLang, partsOrder, createdAt, id } = useSelector(transcribeSelector);
  const { transcriptionSupported } = useSelector(commonSelector);

  async function handleOpenInfo () {
    dispatch(openMenu({ children: <Info />, easyClose: false }));
  }

  async function openSettings () {
    dispatch(openMenu({ children: <Settings />, easyClose: false }));
  }

  async function handleStart () {
    dispatch(transcribeActions.addPart());
    recorder.start();
    transcriber.start();
    dispatch(transcribeActions.setSlice({ mode: 'record' }));
    // dispatch(transcribeActions.updateMetadata());
    await wait(50);
    dispatch(commonActions.scrollToBottomHard(true));
  }

  async function confirmDelete () {
    dispatch(openMenu({ children: <Confirm message='Are you sure you want to delete this transcript?' onConfirm={onDelete} />, easyClose: false }));
  }

  async function onDelete () {
    await dispatch(deleteTranscript({ id }));
    dispatch(commonActions.closeMenu());
    navigate('/transcribe');
  }

  function turnOnEditMode () {
    dispatch(commonActions.scrollToTopHard(true));
    dispatch(commonActions.closeMenu());
    dispatch(transcribeActions.setSlice({ mode: 'edit' }));
  }

  return (
    <div className="flex justify-end">
      <div className="flex flex-col w-fit">
        <StyledButton onClick={handleStart} disabled={partsOrder?.length > 100 ||
           !transcriptionSupported}>
          {/*<span className='icon-mic text-2xl text-white' />*/}
          <span className="text-[0.66rem] w-[20px] h-[20px] ml-[2px] mr-[1px] font-bold text-gray-500 bg-white rounded-md flex items-center justify-center">{languages.find(l => l.name === transcribeLang).code}</span>
          <span className="text-white">Transcribe</span>
        </StyledButton>
        <GroupDivider />
        <StyledButton stopPropagation={true} onClick={openSettings}>
          <span className='icon-settings text-2xl text-white' />
          <span className="text-white">Settings</span>
        </StyledButton>
        {createdAt && (
          <>
            <GroupDivider />
            <StyledButton stopPropagation={true} onClick={turnOnEditMode} disabled={partsOrder.length === 0}>
              <span className="icon-edit text-2xl text-white" />
              <span className="text-white">Edit</span>
            </StyledButton>
            <GroupDivider />
            <StyledButton stopPropagation={true} onClick={handleOpenInfo}>
              <span className='icon-info text-2xl text-white' />
              <span className="text-white">Transcript info</span>
            </StyledButton>
            <GroupDivider />
            <StyledButton stopPropagation={true} onClick={confirmDelete}>
              <span className='icon-delete text-2xl text-white' />
              <span className="text-white">Delete</span>
            </StyledButton>
          </>
        )}
      </div>
    </div>
  );
}
