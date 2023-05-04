import React, { useState } from "react";
import {
  Button,
  InputContainer,
  PageWrapper,
  TodoCard,
  TodoContainer,
  TodoHeader,
  TodoListContainer,
} from "./components/styles";
import nextId from "react-id-generator";
import { useDispatch, useSelector } from "react-redux";
import { __addToDo, __deleteTodo } from "./redux/modules/todosSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { waitTwoSeconds } from "./utils";

function App() {
  const id = nextId();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const onAddTodo = async () => {
    /**
     * 시험 문제 1.
     * 이곳에서 추가하기 기능을 구현해주세요.
     */
    await waitTwoSeconds();
    dispatch(
      __addToDo({
        id: nextId(),
        title: title,
        body: body, //여기를 body로 안하고 ''로 빈문자열 줬더니 add가 안됐었음.
      })
    );
    resetInputs();
  };

  const onDeleteTodo = async (id) => {
    /**
     * 시험 문제 2.
     * 이곳에서 삭제하기 기능을 구현해주세요.
     */
    await waitTwoSeconds();
    dispatch(__deleteTodo(id));
  };

  const resetInputs = () => {
    /**
     * 입력 값을 초기화하고 싶다면 사용하세요.
     */
    setTitle("");
    setBody("");
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeBody = (e) => setBody(e.target.value);
  return (
    <PageWrapper>
      <TodoContainer>
        <TodoHeader>🐢 SLOW TODO LIST 🐢</TodoHeader>
        <InputContainer>
          <span>제목: </span>
          <input
            value={title}
            placeholder="할 일 제목"
            onChange={onChangeTitle}
          />
          <span>내용: </span>
          <input
            value={body}
            placeholder="할 일 내용"
            onChange={onChangeBody}
          />

          <Button onClick={onAddTodo}>+ 추가하기</Button>
        </InputContainer>
        <TodoListContainer>
          {todos.map((todo) => (
            <TodoCard key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>할 일: {todo.body}</span>
              <Button onClick={() => onDeleteTodo(todo.id)}>삭제하기</Button>
            </TodoCard>
          ))}
        </TodoListContainer>
      </TodoContainer>
    </PageWrapper>
  );
}

export default App;
