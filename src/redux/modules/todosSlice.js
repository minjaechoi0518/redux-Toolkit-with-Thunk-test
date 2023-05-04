import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from "../../utils";
import nextId from "react-id-generator";

export const __addToDo = createAsyncThunk(
  "__addToDo",
  async (payload, thunkAPI) => {
    await waitTwoSeconds(); // 2초 대기
    return {
      id: nextId(),
      title: payload.title,
      body: payload.body,
    };
  }
);

export const __deleteTodo = createAsyncThunk(
  "__deleteTodo",
  async (id, thunkAPI) => {
    await waitTwoSeconds(); // 2초 대기
    return id;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(__addToDo.fulfilled, (state, action) => {
        console.log("__addToDo is fulfilled");
        state.list.push(action.payload);
      })

      .addCase(__deleteTodo.fulfilled, (state, action) => {
        console.log("__deleteTodo is fulfilled");
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
