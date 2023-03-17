import React from 'react';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Blackbox } from '../../../components/BlackBox';
import { Dropdown } from '../../../components/Dropdown';
import { DropdownOption } from '../../../components/DropdownOption';
import { FormScreen } from '../../../components/FormScreen';
import { FormScreenBottom } from '../../../components/FormScreenBottom';
import { Group } from '../../../components/Group';
import { GroupDivider } from '../../../components/GroupDivider';
import { GroupInput } from '../../../components/GroupInput';
import { StyledButton } from '../../../components/StyledButton';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { languages } from '../../../common/data';
import { shortcuts } from './Hotkeys';
import { commonActions } from '../../../slices/commonSlice';

export function Settings () {
  const dispatch = useDispatch();
  const { transcribeLang, translateLang, playbackSpeed, cutOffType } = useSelector(transcribeSelector);

  const maxSpeed = 3;
  const minSpeed = 0.5;

  function updatePlaybackSpeed (e) {
    let rounded = _.round(e.target.value, 2);
    rounded = Math.max(minSpeed, Math.min(maxSpeed, rounded));
    dispatch(transcribeActions.setPlaybackSpeed(rounded));
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

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  return (
    <FormScreen>
      <Group title='Change Playback Speed'>
        <Blackbox className='gap-4 py-4'>
          <div className='flex justify-between w-full'>
            <span>Slower</span>
            <span id='playbackspeed-label'>{_.round(playbackSpeed, 2)}x</span>
            <span>Faster</span>
          </div>
          <input
            type='range'
            min={minSpeed}
            className='appearance-none w-full h-1 bg-white rounded-full white cursor-pointer'
            value={_.round(playbackSpeed, 2)}
            onChange={updatePlaybackSpeed}
            onInput={updatePlaybackSpeed}
            max={maxSpeed}
            step={0.25}
          />
        </Blackbox>
      </Group>
      <Group title='Transcription Settings'>
        <GroupInput>
          <span>Transcribe in</span>
          <div className='flex items-center'>
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
            <DropdownOption value='None'>None</DropdownOption>
            {languages.map((language, i) => (
              <DropdownOption key={i} value={language.name}>{language.name}</DropdownOption>
            ))}
          </Dropdown>
        </GroupInput>
        <GroupDivider />
        <GroupInput>
          <span>Cut off transcription results</span>
          <Dropdown onChange={onCutOffTypeSelectChange} defaultValue={cutOffType}>
            <DropdownOption value='auto'>Automatically</DropdownOption>
            <DropdownOption value='manual'>Manually</DropdownOption>
          </Dropdown>
        </GroupInput>
      </Group>
      <Group title='Keyboard Shortcuts'>
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
        <StyledButton onClick={handleClose} dir='single' className='justify-center'>Close</StyledButton>
      </FormScreenBottom>
    </FormScreen>
  );
}
