import { commonActions } from '../../../slices/commonSlice.js';
import { NavbarGroupButton } from '../../../components/NavbarGroupButton.jsx';
import { NavbarGroupDivider } from '../../../components/NavbarGroupDivider.jsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../../components/Button.jsx';

export function TranscriptionsScreenSortMenu () {
  const dispatch = useDispatch();

  async function handleOpenMenu () {
    const options = ['Created at', 'Updated at'];
    dispatch(commonActions.openNavMenu({
      position: 'right',
      isMainMenu: false,
      children: (
        <div className="flex flex-col">
          {options.map((option, index) => (
            <>
              <NavbarGroupButton key={index} twStyle="justify-between">
                <span className="text-white">{option}</span>
                {index === 0 && <span className="icon-check text-2xl text-white" />}
              </NavbarGroupButton>
              {index !== options.length - 1 && <NavbarGroupDivider />}
            </>
          ))}
        </div>
      ),
    }));
  }

  return (
    <Button twStyle="icon-sort" onClick={handleOpenMenu} />
  );
}
