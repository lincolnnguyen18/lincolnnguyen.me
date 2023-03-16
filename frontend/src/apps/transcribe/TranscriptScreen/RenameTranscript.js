import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Group } from '../../../components/Group';
import { TextField } from '../../../components/TextField';
import { FormScreenBottom } from '../../../components/FormScreenBottom';
import { NavbarButton } from '../../../components/NavbarButton';
import { closeMenu } from '../../../common/MenuUtils';
import { GroupDivider } from '../../../components/GroupDivider';
import { FormScreen } from '../../../components/FormScreen';
import { transcribeActions, transcribeSelector } from '../../../slices/transcribeSlice';

export function RenameTranscript () {
  const dispatch = useDispatch();
  const { title } = useSelector(transcribeSelector);

  function onEdit (e) {
    e.preventDefault();
    const formData = new window.FormData(e.target);
    const title = formData.get('title');
    dispatch(transcribeActions.setSlice({ title }));
    closeMenu(dispatch);
  }

  return (
    <FormScreen isForm={true} onSubmit={onEdit}>
      <Group title="Set Transcript Name">
        <TextField placeholder="Transcript name" autoFocus={true} defaultValue={title} name="title" />
      </Group>
      <FormScreenBottom>
        <NavbarButton onClick={() => closeMenu(dispatch)} className="justify-center" outerClassName="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
        <GroupDivider dir="horiz w-36" />
        <NavbarButton onClick={() => closeMenu(dispatch)} className="justify-center" outerClassName="sm:w-48 w-36" dir="horiz" type="submit">Save</NavbarButton>
      </FormScreenBottom>
    </FormScreen>
  );
}
