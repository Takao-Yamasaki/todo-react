import './styles.css';
import { useState } from 'react';
import { InputTodo } from './components/inputTodo';
import { IncompleteTodos } from './components/incompleteTodos';
import { CompleteTodos } from './components/completeTodos';

export const Todo = () => {
  const [todoText, setTodotext] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) =>  setTodotext(event.target.value);

  // タスクの追加
  const onClickAdd = () => {
    // テキストボックスが空の時はreturnする
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    // テキストボックスを空にする
    setTodotext("");
  };

  // タスクの削除
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // タスクの完了機能
  const onClickComplite = (index) => {
    // タスクの削除
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);
    // タスクを完了のTODOに追加
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]]
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  // タスクの戻す機能
  const onClickBack = (index) => {
    // タスクの削除
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    // タスクを未完了のTODOに追加
    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  const isMaxLimitIncompleteTodos = incompleteTodos.length >= 5

  return (
    <>
      <InputTodo todoText={todoText} onChange={onChangeTodoText} onClick={onClickAdd} disabled={isMaxLimitIncompleteTodos} />
      {/* 未完了のTODOが5個以上であれば、警告を表示 */}
      { isMaxLimitIncompleteTodos && (<p style={{ color: "red" }}>登録できるTODOは5個までだよ〜。消化しろ〜。</p>)}
      <IncompleteTodos todos={incompleteTodos} onClickComplite={onClickComplite} onClickDelete={onClickDelete} />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
}
