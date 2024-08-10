import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Planet } from '../utils/types';

export type CardsState = {
  page: Planet[];
  selectedCards: Planet[];
};

const initialState: CardsState = {
  page: [],
  selectedCards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<Planet>) {
      state.selectedCards.push(action.payload);
    },
    unselectItem(state, action: PayloadAction<Planet>) {
      state.selectedCards = state.selectedCards.filter((item) => item.name !== action.payload.name);
    },
  },
});

export const { selectItem, unselectItem } = cardsSlice.actions;
export default cardsSlice.reducer;
