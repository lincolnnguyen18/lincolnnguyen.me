import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Blackbox } from '../../../components/BlackBox';
import { FormScreen } from '../../../components/FormScreen';
import { FormScreenBottom } from '../../../components/FormScreenBottom';
import { Group } from '../../../components/Group';
import { StyledButton } from '../../../components/StyledButton';
import { transcribeSelector } from '../../../slices/transcribeSlice';
import { commonActions } from '../../../slices/commonSlice';
import { formatUnixTimestampFull } from '../../../common/stringUtils';

export function Info () {
  const dispatch = useDispatch();
  const { createdAt, title, updatedAt } = useSelector(transcribeSelector);

  function handleClose () {
    dispatch(commonActions.closeMenu());
  }

  // const testTitle = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur maximus vestibulum scelerisque. Nullam pharetra felis nulla, ut finibus purus sodales at. Donec sit amet interdum libero, lobortis consectetur orci. Maecenas ac molestie libero. Mauris nibh velit, dapibus quis magna a, blandit accumsan turpis. Proin ullamcorper, augue a ullamcorper lacinia, eros dolor euismod turpis, eu vulputate enim ligula at nisi.';
  // const testDuration = '6:15:47';
  // const testCreated = '4:02 AM 4/20/2021';
  // const testUpdated = '4:02 AM 4/20/2021';

  return (
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
        <StyledButton onClick={handleClose} dir="single" className="justify-center">Close</StyledButton>
      </FormScreenBottom>
    </FormScreen>
  );
}
