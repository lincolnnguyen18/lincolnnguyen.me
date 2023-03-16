import { commonActions } from '../slices/commonSlice';
import { NavbarButton } from '../components/NavbarButton';
import { GroupDivider } from '../components/GroupDivider';
import { wait } from './timeUtils';
import { GroupInput } from '../components/GroupInput';
import { FormScreenBottom } from '../components/FormScreenBottom';
import { Group } from '../components/Group';
import { FormScreen } from '../components/FormScreen';
import { Confirm } from '../apps/main/Confirm';

function closeMenu (dispatch) {
  dispatch(commonActions.closeNavMenu());
}

function openConfirm ({ dispatch, title = 'Please Confirm', message, onConfirm }) {
  dispatch(commonActions.openNavMenu({
    position: 'right',
    isMainMenu: false,
    centerContent: true,
    easyClose: false,
    hideCloseButton: true,
    children: (
      <Confirm title={title} message={message} onConfirm={onConfirm} />
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
          <NavbarButton onClick={() => closeMenu(dispatch)} className="justify-center" outerClassName="sm:w-48 w-36" dir="single">Close</NavbarButton>
        </FormScreenBottom>
      </FormScreen>
    ),
  }));
}

export { closeMenu, openConfirm, showShortcuts };
