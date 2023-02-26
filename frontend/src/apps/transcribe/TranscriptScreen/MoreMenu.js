import { commonActions, commonSelector } from '../../../slices/commonSlice.js';
import { wait } from '../../../common/timeUtils.js';
import { NavbarButton } from '../../../components/NavbarButton';
import { GroupDivider } from '../../../components/GroupDivider';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../components/Button';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice.js';
import { GroupInput } from '../../../components/GroupInput';
import { Dropdown } from '../../../components/Dropdown';
import { Group } from '../../../components/Group';
import { FormScreen } from '../../../components/FormScreen';
import { Blackbox } from '../../../components/BlackBox';
import { FormScreenBottom } from '../../../components/FormScreenBottom';
import { languages } from '../../../common/data';
import { closeMenu, openConfirm, showShortcuts } from '../../../common/MenuUtils';
import { shortcuts } from './Hotkeys';
import _ from 'lodash';

export function MoreMenu ({ disabled }) {
  const dispatch = useDispatch();
  const { mode, recorder, transcriber, playing, transcribeLanguage, translateLanguage, partsOrder, createdAt, playbackSpeed, cutOffType } = useSelector(transcribeSelector);
  const { scrollPosition } = useSelector(commonSelector);

  async function handleOpenInfo () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();

    const testTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vestibulum scelerisque. Nullam pharetra felis nulla, ut finibus purus sodales at. Donec sit amet interdum libero, lobortis consectetur orci. Maecenas ac molestie libero. Mauris nibh velit, dapibus quis magna a, blandit accumsan turpis. Proin ullamcorper, augue a ullamcorper lacinia, eros dolor euismod turpis, eu vulputate enim ligula at nisi.';
    const testDuration = '6:15:47';
    const testCreated = '4:02 AM 4/20/2021';
    const testUpdated = '4:02 AM 4/20/2021';

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      centerContent: true,
      easyClose: false,
      children: (
        <FormScreen>
          <Group title="Transcript Info">
            <Blackbox>
              <span className="font-semibold sm:text-lg text-base mb-2">{testTitle}</span>
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <span className="font-semibold sm:text-base text-sm">Duration</span>
                  <span className="sm:text-base text-sm">{testDuration}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold sm:text-base text-sm">Created</span>
                  <span className="sm:text-base text-sm">{testCreated}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold sm:text-base text-sm">Updated</span>
                  <span className="sm:text-base text-sm">{testUpdated}</span>
                </div>
              </div>
            </Blackbox>
          </Group>
          <FormScreenBottom>
            <NavbarButton onClick={() => closeMenu(dispatch)} dir="single" twStyle="justify-center">Close</NavbarButton>
          </FormScreenBottom>
        </FormScreen>
      ),
    }));
  }

  // const [defaultPlaybackSpeed, setDefaultPlaybackSpeed] = React.useState(playbackSpeed);

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
      const transcribeLanguage = e.target.value;
      dispatch(transcribeActions.setSlice({ transcribeLanguage }));
    }

    function onTranslateSelectChange (e) {
      const translateLanguage = e.target.value;
      dispatch(transcribeActions.setSlice({ translateLanguage }));
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
            <Blackbox twStyle="gap-4 py-4">
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
                step={(maxSpeed - minSpeed) / 100}
              />
            </Blackbox>
          </Group>
          <Group title="Transcription Settings">
            <GroupInput>
              <span>Transcribe in</span>
              <div className="flex items-center">
                <Dropdown onChange={onTranscribeSelectChange} defaultValue={transcribeLanguage}>
                  {languages.map((language, i) => (
                    <option key={i} value={language.name}>{language.name}</option>
                  ))}
                </Dropdown>
              </div>
            </GroupInput>
            <GroupDivider />
            <GroupInput>
              <span>Translate to</span>
              <Dropdown onChange={onTranslateSelectChange} defaultValue={translateLanguage}>
                <option value="None">None</option>
                {languages.map((language, i) => (
                  <option key={i} value={language.name}>{language.name}</option>
                ))}
              </Dropdown>
            </GroupInput>
            <GroupDivider />
            <GroupInput>
              <span>Cut off transcription results</span>
              <Dropdown onChange={onCutOffTypeSelectChange} defaultValue={cutOffType}>
                <option value="auto">Automatically</option>
                <option value="manual">Manually</option>
              </Dropdown>
            </GroupInput>
          </Group>
          <FormScreenBottom>
            <NavbarButton onClick={() => closeMenu(dispatch)} dir="single" twStyle="justify-center">Close</NavbarButton>
          </FormScreenBottom>
        </FormScreen>
      ),
    }));
  }

  // async function handleFilterBySpeaker () {
  //   dispatch(commonActions.hideNavMenuChildren());
  //   await wait();
  //   const options = ['Both speakers', 'Lincoln Nguyen', 'Maimi Yoshikawa'];
  //   dispatch(commonActions.openNavMenu({
  //     position: 'right',
  //     isMainMenu: false,
  //     children: (
  //       <div className="flex flex-col">
  //         {options.map((option, index) => (
  //           <React.Fragment key={index}>
  //             <NavbarGroupButton twStyle="justify-between">
  //               <span className="text-white">{option}</span>
  //               {index === 0 && <span className="icon-check text-2xl text-white" />}
  //             </NavbarGroupButton>
  //             {index !== options.length - 1 && <NavbarGroupDivider />}
  //           </React.Fragment>
  //         ))}
  //       </div>
  //     ),
  //   }));
  // }

  const [turningOnEditMode, setTurningOnEditMode] = React.useState(false);

  function turnOnEditMode () {
    closeMenu(dispatch);
    if (scrollPosition === 0) {
      dispatch(transcribeActions.setSlice({ mode: 'edit' }));
    } else {
      dispatch(commonActions.scrollToTop());
      setTurningOnEditMode(true);
    }
  }

  React.useEffect(() => {
    if (scrollPosition === 0 && turningOnEditMode) {
      setTimeout(() => {
        dispatch(transcribeActions.setSlice({ mode: 'edit' }));
        setTurningOnEditMode(false);
      }, 50);
    }
  }, [scrollPosition]);

  function openShortcuts () {
    showShortcuts({ dispatch, shortcuts });
  }

  function onDelete () {
    console.log('deleting transcript');
  }

  async function confirmDelete () {
    dispatch(commonActions.hideNavMenuChildren());
    await wait();
    openConfirm({ dispatch, message: 'Are you sure you want to delete this transcript?', onConfirm: onDelete });
  }

  function openMoreMenu () {
    async function handleStart () {
      dispatch(transcribeActions.addPart());
      recorder.start();
      transcriber.start();
      dispatch(transcribeActions.setSlice({ mode: 'record' }));
      dispatch(transcribeActions.updateMetadata());
      window.interval = setInterval(() => {
        dispatch(transcribeActions.incrementDuration(0.1));
      }, 100);
      await wait(50);
      dispatch(commonActions.scrollToBottom(true));
    }

    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          <NavbarButton onClick={handleStart}>
            {/*<span className='icon-mic text-2xl text-white' />*/}
            <span className="text-[0.66rem] w-[20px] h-[20px] ml-[2px] mr-[1px] font-bold text-gray-500 bg-white rounded-md flex items-center justify-center">{languages.find(l => l.name === transcribeLanguage).code}</span>
            <span className="text-white">Transcribe</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={turnOnEditMode} disabled={partsOrder.length === 0}>
            <span className="icon-edit text-2xl text-white" />
            <span className="text-white">Edit</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={openSettings}>
            <span className='icon-settings text-2xl text-white' />
            <span className="text-white">Settings</span>
          </NavbarButton>
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={openShortcuts}>
            <span className='icon-keyboard text-2xl text-white' />
            <span className="text-white">Shortcuts</span>
          </NavbarButton>
          {/*<NavbarGroupButton onClick={handleFilterBySpeaker} stopPropagation={true}>*/}
          {/*  <span className='icon-two-users text-2xl text-white' />*/}
          {/*  <span className="text-white">Filter by speaker</span>*/}
          {/*</NavbarGroupButton>*/}
          {/*<NavbarGroupDivider />*/}
          {createdAt && (
            <>
              <GroupDivider />
              <NavbarButton stopPropagation={true} onClick={handleOpenInfo}>
                <span className='icon-info text-2xl text-white' />
                <span className="text-white">Transcript info</span>
              </NavbarButton>
            </>
          )}
          <GroupDivider />
          <NavbarButton stopPropagation={true} onClick={confirmDelete}>
            <span className='icon-delete text-2xl text-white' />
            <span className="text-white">Delete</span>
          </NavbarButton>
        </div>
      ),
    }));
  }

  return (
    <Button twStyle="icon-more-horiz" onClick={openMoreMenu} disabled={disabled || playing || mode !== 'default'} />
  );
}
