import { createSlice, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getActionTypePrefix } from 'utils/miscUtils';
import { openMenu } from 'slices/menuAsyncActions';

interface MenuState {
  menuIsOpen: boolean;
  menuChildren?: JSX.Element | JSX.Element[] | null;
  menuChildrenAreHidden: boolean;
  menuCanBeClosedByClickingOutside: boolean;
  menuCloseButtonIsDisabled: boolean;
}

const initialState: MenuState = {
  menuIsOpen: false,
  menuChildren: null,
  menuChildrenAreHidden: false,
  menuCanBeClosedByClickingOutside: true,
  menuCloseButtonIsDisabled: false,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<MenuState>>) => {
      return { ...state, ...action.payload };
    },
    closeMenu: (state) => {
      state.menuIsOpen = false;
      // TODO: figure out if this is necessary when implementing more menu
      // state.menuCanBeClosedByClickingOutside = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(isPending, isFulfilled, isRejected), (state, action) => {
        // don't disable the menu close button when the menu is opening
        const typePrefix = getActionTypePrefix(action);
        if (typePrefix === openMenu.typePrefix) return;
        state.menuCloseButtonIsDisabled = !state.menuCloseButtonIsDisabled;
      });
  },
});

const menuActions = menuSlice.actions;
const menuReducer = menuSlice.reducer;
const menuSelector = (state: { menu: MenuState }) => state.menu;

export type { MenuState };
export { menuActions, menuReducer, menuSelector };
