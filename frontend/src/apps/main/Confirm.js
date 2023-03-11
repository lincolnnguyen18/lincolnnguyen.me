import React from 'react';
import { NavbarButton } from '../../components/NavbarButton';
import { GroupDivider } from '../../components/GroupDivider';
import { closeMenu } from '../../common/MenuUtils';
import { useDispatch } from 'react-redux';

export function Confirm ({ title, message, onConfirm }) {
  const dispatch = useDispatch();
  const [confirmed, setConfirmed] = React.useState(false);

  function handleConfirm () {
    setConfirmed(true);
    onConfirm();
  }

  return (
    <div className="flex flex-col w-full text-white items-center">
      <div className="w-full max-w-md">
        <span className="font-semibold sm:text-lg text-base">{title}</span>
        <div className="bg-black bg-opacity-50 rounded-lg w-full flex-col mb-6 mt-2 py-2 px-3">
          <span>{message}</span>
        </div>
      </div>
      <div className="flex">
        <NavbarButton disabled={confirmed} onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
        <GroupDivider dir="horiz w-36" />
        <NavbarButton onClick={handleConfirm} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit" disabled={confirmed}>Confirm</NavbarButton>
      </div>
    </div>
  );
}
