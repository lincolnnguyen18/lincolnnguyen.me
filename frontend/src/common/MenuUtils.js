import { commonActions } from '../slices/commonSlice';
import { NavbarButton } from '../components/NavbarButton';
import { GroupDivider } from '../components/GroupDivider';
import { wait } from './timeUtils';
import { GroupInput } from '../components/GroupInput';
import { FormScreenBottom } from '../components/FormScreenBottom';
import { Group } from '../components/Group';
import { FormScreen } from '../components/FormScreen';

function closeMenu (dispatch) {
  dispatch(commonActions.closeNavMenu());
}

function openAlert ({ dispatch, title, message }) {
  dispatch(commonActions.openNavMenu({
    position: 'right',
    isMainMenu: false,
    centerContent: true,
    easyClose: false,
    hideCloseButton: true,
    children: (
      <div className="flex flex-col w-full text-white items-center">
        <div className="w-full max-w-md">
          <span className="font-semibold sm:text-lg text-base">{title}</span>
          <div className="bg-black bg-opacity-50 rounded-lg w-full flex-col mb-6 mt-2 py-2 px-3">
            <span>{message}</span>
          </div>
        </div>
        <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="single">Cancel</NavbarButton>
      </div>
    ),
  }));
}

function openConfirm ({ dispatch, title = 'Please Confirm', message, onConfirm }) {
  dispatch(commonActions.openNavMenu({
    position: 'right',
    isMainMenu: false,
    centerContent: true,
    easyClose: false,
    hideCloseButton: true,
    children: (
      <div className="flex flex-col w-full text-white items-center">
        <div className="w-full max-w-md">
          <span className="font-semibold sm:text-lg text-base">{title}</span>
          <div className="bg-black bg-opacity-50 rounded-lg w-full flex-col mb-6 mt-2 py-2 px-3">
            <span>{message}</span>
          </div>
        </div>
        <div className="flex">
          <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz">Cancel</NavbarButton>
          <GroupDivider dir="horiz w-36" />
          <NavbarButton onClick={onConfirm} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="horiz" type="submit">Confirm</NavbarButton>
        </div>
      </div>
    ),
  }));
}

async function showShortcuts ({ dispatch, shortcuts }) {
  dispatch(commonActions.hideNavMenuChildren());
  await wait();

  dispatch(commonActions.openNavMenu({
    position: 'right',
    isMainMenu: false,
    centerContent: true,
    easyClose: false,
    children: (
      <FormScreen>
        <Group title="Keyboard Shortcuts">
          {shortcuts.map(({ name, key }, i) => (
            <>
              <GroupInput>
                <span>{name}</span>
                <span>{key}</span>
              </GroupInput>
              {i !== shortcuts.length - 1 && <GroupDivider />}
            </>
          ))}
        </Group>
        <FormScreenBottom>
          <NavbarButton onClick={() => closeMenu(dispatch)} twStyle="justify-center" outerTwStyle="sm:w-48 w-36" dir="single">Close</NavbarButton>
        </FormScreenBottom>
      </FormScreen>
    ),
  }));
}

export { closeMenu, openAlert, openConfirm, showShortcuts };
