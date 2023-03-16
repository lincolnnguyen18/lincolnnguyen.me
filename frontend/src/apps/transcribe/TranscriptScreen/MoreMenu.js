import React from 'react';
import _ from 'lodash';
import { NavbarButton } from '../../../components/NavbarButton';
import { languages } from '../../../common/data';
import { GroupDivider } from '../../../components/GroupDivider';
import { deleteTranscript, transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { wait } from '../../../common/timeUtils';
import { commonActions, commonSelector } from '../../../slices/commonSlice';
import { useDispatch, useSelector } from 'react-redux';
import { closeMenu, openConfirm } from '../../../common/MenuUtils';
import { useNavigate } from 'react-router-dom';
import { FormScreen } from '../../../components/FormScreen';
import { Group } from '../../../components/Group';
import { Blackbox } from '../../../components/BlackBox';
import { formatUnixTimestampFull } from '../../../common/stringUtils';
import { FormScreenBottom } from '../../../components/FormScreenBottom';
import { GroupInput } from '../../../components/GroupInput';
import { Dropdown } from '../../../components/Dropdown';
import { DropdownOption } from '../../../components/DropdownOption';
import { shortcuts } from './Hotkeys';

export function MoreMenu () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recorder, transcriber, transcribeLang, translateLang, partsOrder, createdAt, playbackSpeed, cutOffType, id, title, updatedAt } = useSelector(transcribeSelector);
  const { transcriptionSupported } = useSelector(commonSelector);

  async function handleOpenInfo () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    // const testTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vestibulum scelerisque. Nullam pharetra felis nulla, ut finibus purus sodales at. Donec sit amet interdum libero, lobortis consectetur orci. Maecenas ac molestie libero. Mauris nibh velit, dapibus quis magna a, blandit accumsan turpis. Proin ullamcorper, augue a ullamcorper lacinia, eros dolor euismod turpis, eu vulputate enim ligula at nisi.';
    // const testDuration = '6:15:47';
    // const testCreated = '4:02 AM 4/20/2021';
    // const testUpdated = '4:02 AM 4/20/2021';

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <FormScreen>
          <Group title="Transcript Info">
            <Blackbox>
              <span className="font-semibold sm:text-lg text-base mb-2">{title}</span>
              <div className="flex flex-col gap-2 justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-semibold sm:text-base text-sm">Created</span>
                  <span className="sm:text-base text-sm">{formatUnixTimestampFull(createdAt)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold sm:text-base text-sm">Updated</span>
                  <span className="sm:text-base text-sm">{formatUnixTimestampFull(updatedAt)}</span>
                </div>
                {/*<div className="flex flex-col">*/}
                {/*  <span className="font-semibold sm:text-base text-sm">Total Parts</span>*/}
                {/*  <span className="sm:text-base text-sm">{partsOrder.length}</span>*/}
                {/*</div>*/}
              </div>
            </Blackbox>
          </Group>
          <FormScreenBottom>
            <NavbarButton onClick={() => closeMenu(dispatch)} dir="single" className="justify-center">Close</NavbarButton>
          </FormScreenBottom>
        </FormScreen>
      ),
    }));
  }

  async function openSettings () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    const maxSpeed = 3;
    const minSpeed = 0.5;

    function updatePlaybackSpeed (e) {
      let rounded = _.round(e.target.value, 2);
      rounded = Math.max(minSpeed, Math.min(maxSpeed, rounded));
      dispatch(transcribeActions.setPlaybackSpeed(rounded));
      const label = document.getElementById('playbackspeed-label');
      label.innerText = `${rounded}x`;
    }

    function onTranscribeSelectChange (e) {
      const transcribeLang = e.target.value;
      dispatch(transcribeActions.setSlice({ transcribeLang }));
    }

    function onTranslateSelectChange (e) {
      const translateLang = e.target.value;
      dispatch(transcribeActions.setSlice({ translateLang }));
    }

    function onCutOffTypeSelectChange (e) {
      const cutOffType = e.target.value;
      dispatch(transcribeActions.setSlice({ cutOffType }));
      window.cutOffType = cutOffType;
    }

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <FormScreen>
          <Group title="Change Playback Speed">
            <Blackbox className="gap-4 py-4">
              <div className="flex justify-between w-full">
                <span>Slower</span>
                <span id="playbackspeed-label">{_.round(playbackSpeed, 2)}x</span>
                <span>Faster</span>
              </div>
              <input
                type="range"
                min={minSpeed}
                className="appearance-none w-full h-1 bg-white rounded-full white cursor-pointer"
                defaultValue={_.round(playbackSpeed, 2)}
                onChange={updatePlaybackSpeed}
                onInput={updatePlaybackSpeed}
                max={maxSpeed}
                step={0.25}
              />
            </Blackbox>
          </Group>
          <Group title="Transcription Settings">
            <GroupInput>
              <span>Transcribe in</span>
              <div className="flex items-center">
                <Dropdown onChange={onTranscribeSelectChange} defaultValue={transcribeLang}>
                  {languages.map((language, i) => (
                    <DropdownOption key={i} value={language.name}>{language.name}</DropdownOption>
                  ))}
                </Dropdown>
              </div>
            </GroupInput>
            <GroupDivider />
            <GroupInput>
              <span>Translate to</span>
              <Dropdown onChange={onTranslateSelectChange} defaultValue={translateLang}>
                <DropdownOption value="None">None</DropdownOption>
                {languages.map((language, i) => (
                  <DropdownOption key={i} value={language.name}>{language.name}</DropdownOption>
                ))}
              </Dropdown>
            </GroupInput>
            <GroupDivider />
            <GroupInput>
              <span>Cut off transcription results</span>
              <Dropdown onChange={onCutOffTypeSelectChange} defaultValue={cutOffType}>
                <DropdownOption value="auto">Automatically</DropdownOption>
                <DropdownOption value="manual">Manually</DropdownOption>
              </Dropdown>
            </GroupInput>
          </Group>
          <Group title="Keyboard Shortcuts">
            {shortcuts.map(({ name, key }, i) => (
              <React.Fragment key={i}>
                <GroupInput>
                  <span>{name}</span>
                  <span>{key}</span>
                </GroupInput>
                {i !== shortcuts.length - 1 && <GroupDivider />}
              </React.Fragment>
            ))}
          </Group>
          <FormScreenBottom>
            <NavbarButton onClick={() => closeMenu(dispatch)} dir="single" className="justify-center">Close</NavbarButton>
          </FormScreenBottom>
        </FormScreen>
      ),
    }));
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
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    openConfirm({ dispatch, message: 'Are you sure you want to delete this transcript?', onConfirm: onDelete });
  }

  async function onDelete () {
    await dispatch(deleteTranscript({ id }));
    navigate('/transcribe/transcripts');
  }

  function turnOnEditMode () {
    dispatch(commonActions.scrollToTopHard(true));
    closeMenu(dispatch);
    dispatch(transcribeActions.setSlice({ mode: 'edit' }));
  }

  return (
    <div className="flex flex-col">
      <NavbarButton onClick={handleStart} disabled={partsOrder?.length > 100 ||
           !transcriptionSupported}>
        {/*<span className='icon-mic text-2xl text-white' />*/}
        <span className="text-[0.66rem] w-[20px] h-[20px] ml-[2px] mr-[1px] font-bold text-gray-500 bg-white rounded-md flex items-center justify-center">{languages.find(l => l.name === transcribeLang).code}</span>
        <span className="text-white">Transcribe</span>
      </NavbarButton>
      <GroupDivider />
      <NavbarButton stopPropagation={true} onClick={openSettings}>
        <span className='icon-settings text-2xl text-white' />
        <span className="text-white">Settings</span>
      </NavbarButton>
      {createdAt && (
        <>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={turnOnEditMode} disabled={partsOrder.length === 0}>
            <span className="icon-edit text-2xl text-white" />
            <span className="text-white">Edit</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={handleOpenInfo}>
            <span className='icon-info text-2xl text-white' />
            <span className="text-white">Transcript info</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={confirmDelete}>
            <span className='icon-delete text-2xl text-white' />
            <span className="text-white">Delete</span>
          </NavbarButton>
        </>
      )}
    </div>
  );
}
