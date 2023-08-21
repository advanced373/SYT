import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createThought } from './thought-createAPI';
import { Thought } from '../thought-list/model/thought.model';

const initialState: {thoughts: Thought[], status: string} = {
  thoughts: [],
  status: 'no'
};

export const addAsync = createAsyncThunk(
  'thought/add',
  async (values) => {
    console.log(values);
    const response = await createThought(values);
    return response;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    add: (state, values) => {console.log(values); state.thoughts = values.payload;}
  },
});
export const selectThoughts = (state: {thoughts: Thought[], status: string}) => state.thoughts;
export const { add } = counterSlice.actions;
