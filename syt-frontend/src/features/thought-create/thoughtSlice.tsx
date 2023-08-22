import { combineReducers, createSlice, createStore } from '@reduxjs/toolkit';
import { createThought } from './thought-createAPI';
import { Thought } from '../thought-list/model/thought.model';

const initialState: {thoughts: Thought[], status: string} = {
  thoughts: [],
  status: 'no'
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, values) => {state.thoughts.push(values.payload)}
  },
});
export const selectThoughts = (state: {thoughts: Thought[], status: string}) => state.thoughts;
export const { add } = counterSlice.actions;

const reducer = combineReducers({
  counter: counterSlice.reducer,
})
export const store = createStore(reducer)