import React from 'react';
import { TextField } from '../../../components/TextField';
import { StyledButton } from '../../../components/StyledButton';
import { GroupDivider } from '../../../components/GroupDivider';
import { FormScreen } from '../../../components/FormScreen';
import { FormScreenBottom } from '../../../components/FormScreenBottom';
import { Group } from '../../../components/Group';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { transcribeSelector } from '../../../slices/transcribeSlice';
import { commonActions } from '../../../slices/commonSlice';

export function Search () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keywords } = useSelector(transcribeSelector);

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  function onSearch (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { keywords } = Object.fromEntries(formData);
    if (keywords?.trim()) {
      navigate(`/transcribe?keywords=${encodeURIComponent(keywords)}`);
    } else {
      navigate('/transcribe');
    }
    handleClose();
  }

  return (
    <FormScreen isForm={true} onSubmit={onSearch}>
      <Group title="Keywords">
        <TextField placeholder="Enter keywords here" autoFocus={true} defaultValue={keywords} name="keywords" id="focus" />
        <span className="text-xs sm:text-sm text-gray-subtext2 mt-2">For example, enter "cse 416" to search for all transcripts with "cse 416" anywhere in their title.</span>
      </Group>
      {/*<GroupInput className="rounded-lg mt-6">*/}
      {/*  <span>Sorted by</span>*/}
      {/*  <Dropdown defaultValue={sort} name="sort">*/}
      {/*    <DropdownOption value="updated_at">Updated at</DropdownOption>*/}
      {/*    <DropdownOption value="created_at">Created at</DropdownOption>*/}
      {/*  </Dropdown>*/}
      {/*</GroupInput>*/}
      <FormScreenBottom>
        <StyledButton onClick={handleClose} className="justify-center" outerClassName="sm:w-48 w-36" dir="horiz">Cancel</StyledButton>
        <GroupDivider dir="horiz" />
        <StyledButton className="justify-center" outerClassName="sm:w-48 w-36" dir="horiz" type="submit">Search</StyledButton>
      </FormScreenBottom>
    </FormScreen>
  );
}
