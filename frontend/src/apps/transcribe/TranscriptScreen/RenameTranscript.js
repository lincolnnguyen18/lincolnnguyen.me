import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Group } from '../../../components/Group';
import { TextField } from '../../../components/TextField';
import { FormScreenBottom } from '../../../components/FormScreenBottom';
import { StyledButton } from '../../../components/StyledButton';
import { GroupDivider } from '../../../components/GroupDivider';
import { FormScreen } from '../../../components/FormScreen';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';
import { commonActions } from '../../../slices/commonSlice';

export function RenameTranscript () {
  const dispatch = useDispatch();
  const { title } = useSelector(transcribeSelector);

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  function onEdit (e) {
    e.preventDefault();
    const formData = new window.FormData(e.target);
    const title = formData.get('title');
    dispatch(transcribeActions.setSlice({ title }));
    handleClose();
  }

  return (
    <FormScreen isForm={true} onSubmit={onEdit}>
      <Group title="Set Transcript Name">
        <TextField placeholder="Transcript name" autoFocus={true} defaultValue={title} name="title" />
      </Group>
      <FormScreenBottom>
        <StyledButton onClick={handleClose} className="justify-center" outerClassName="sm:w-48 w-36" dir="horiz">Cancel</StyledButton>
        <GroupDivider dir="horiz w-36" />
        <StyledButton onClick={handleClose} className="justify-center" outerClassName="sm:w-48 w-36" dir="horiz" type="submit">Save</StyledButton>
      </FormScreenBottom>
    </FormScreen>
  );
}
