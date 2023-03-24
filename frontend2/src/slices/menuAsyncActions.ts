import { createAsyncThunk } from '@reduxjs/toolkit';
import { menuActions, MenuState } from 'slices/menuSlice';
import { wait } from 'utils/miscUtils';

interface OpenMenuProps {
  menuChildren: JSX.Element | JSX.Element[];
  menuCanBeClosedByClickingOutside?: boolean;
}

const openMenu = createAsyncThunk(
  'menu/openMenu',
  async (props: OpenMenuProps, { dispatch, getState }) => {
    const { menu } = getState() as { menu: MenuState };
    const { menuIsOpen } = menu;
    const { menuChildren, menuCanBeClosedByClickingOutside = true } = props;
    if (menuIsOpen) {
      dispatch(menuActions.updateSlice({ menuChildrenAreHidden: true }));
      await wait(100);
      dispatch(menuActions.updateSlice({ menuChildren, menuCanBeClosedByClickingOutside }));
      await wait(50);
      dispatch(menuActions.updateSlice({ menuChildrenAreHidden: false }));
    } else {
      dispatch(menuActions.updateSlice({ menuIsOpen: true, menuChildren, menuCanBeClosedByClickingOutside }));
    }
  },
);

export { openMenu };
