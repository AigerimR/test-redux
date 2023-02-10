import { configureStore, createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "list",
  initialState: [],
  reducers: {
    addToList(state, action) {
      state.push(action.payload);
    },
    removeFromList(state, action) {
      const i = state.indexOf(action.payload);
      state.splice(i, 1);
    },
  },
});

const modalSlice = createSlice({
  name: "modal",
  initialState: { modalConfirmAddOpen: false, modalConfirmRemoveOpen: false },
  reducers: {
    openAddModal(state, action) {
      state.modalConfirmAddOpen = action.payload;
    },
    openRemoveModal(state, action) {
      state.modalConfirmRemoveOpen = action.payload;
    },
  },
});

const deleteListSlice = createSlice({
  name: "deleteList",
  initialState: [],
  reducers: {
    addToDeleteList(state, action) {
      state.push(action.payload);
    },
    removeFromDeleteList(state, action) {
      const i = state.indexOf(action.payload);
      state.splice(i, 1);
    },
  },
});

const store = configureStore({
  reducer: {
    list: listSlice.reducer,
    modal: modalSlice.reducer,
    deleteList: deleteListSlice.reducer,
  },
});

export { store };
export const { addToList, removeFromList } = listSlice.actions;
export const { addToDeleteList, removeFromDeleteList } =
  deleteListSlice.actions;
export const { openAddModal, openRemoveModal } = modalSlice.actions;
