import './styles.css';
import { useState } from 'react';

export const Todo = () => {
  const [todoText, setTodotext] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(["TODOです1", "TODOです2"]);
  const [completeTodos, setCompleteTodos] = useState(["TODOでした1", "TODOでした2"]);

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

  return (
    <>
      <div className="input-area">
        <input placeholder="TODOを入力" value={todoText} onChange={onChangeTodoText} />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => (
              <li key={todo}>
                <div className="list-row">
                  <p className="todo-item">{todo}</p>
                  <button onClick={() => onClickComplite(index)}>完了</button>
                  <button onClick={() => onClickDelete(index)}>削除</button>
                </div>
              </li>
          ))}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo) => (
            <li key={todo}>
              <div className="list-row">
                <p className="todo-item">{todo}</p>
                <button>戻す</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
