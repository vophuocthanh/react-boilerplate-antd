import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface appState {
  loading: boolean;
  error?: string;
  size?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowSelectionRecord?: any;
  currentThem: string;
  apiState: number;
}

const initialState: appState = {
  loading: false,
  error: undefined,
  size: undefined,
  rowSelectionRecord: undefined,
  currentThem: 'dark',
  apiState: 200,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppWidth(state, action: PayloadAction<string | undefined>) {
      state.size = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setRowSelectionRecord(state, action: PayloadAction<any>) {
      state.rowSelectionRecord = action.payload;
    },
    setCurrentTheme(state, action: PayloadAction<string>) {
      state.currentThem = action.payload;
    },
    setAPIState(state, action: PayloadAction<number>) {
      state.apiState = action.payload;
    },
  },
});

export const appAction = appSlice.actions;
const appReducer = appSlice.reducer;
export default appReducer;
