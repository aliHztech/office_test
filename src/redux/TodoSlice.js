import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodo = createAsyncThunk("fetchTodo", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isloading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.pending, (state, action) => {
      state.isloading = true;
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.isloading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodo.rejected, (state, action) => {
      state.error = true;
    });
  },
  reducers: {
    addUser: (state, action) => {
      const { id } = action.payload;
      console.log(action.payload, "actionpayload");
      const find = state.data.find((user) => user.id == id);
      if (find.task) {
        const available = action.payload;
        find.task.push(available);
      }
      if (!find.task && find) {
        console.log(action.payload);
        find.task = [action.payload];
      }
    },
    deleteTask: (state, action) => {
      const { newArray, id } = action.payload;
      const condition = state.data[id - 1].hasOwnProperty("task");
      if (condition) {
        state.data[id - 1].task = newArray;
      }
    },
    editTask: (state, action) => {
      const { id, key, task, deadLine } = action.payload;
      console.log(id, key, task, deadLine, "id, key, task, deadLine ");
      const user = state.data.find((user) => user.id == id);
      const taskArray = user.task.find((f) => f.key == key);

      if (taskArray) {
        taskArray.task = task;
        taskArray.deadLine = deadLine;
      }
    },
  },
});
export const { addUser, deleteTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;
