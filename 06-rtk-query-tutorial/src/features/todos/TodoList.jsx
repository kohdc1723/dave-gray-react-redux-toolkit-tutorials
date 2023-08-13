import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons"
import {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} from "../api/apiSlice";

const TodoList = () => {
    const [newTodo, setNewTodo] = useState("");

    const { data: todos, isLoading, isSuccess, isError, error } = useGetTodosQuery();
    const [addTodo] = useAddTodoMutation();
    const [updateTodo] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const onSubmitForm = e => {
        e.preventDefault();
        addTodo({ userId: 1, title: newTodo, completed: false });
        setNewTodo("");
    };
    const onChangeNewTodo = e => setNewTodo(e.target.value);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = todos.map(todo => (
            <article key={todo.id}>
                <div className="todo">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        id={todo.id}
                        onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
                    />
                    <label htmlFor={todo.id}>{todo.title}</label>
                </div>
                <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </article>
        ));
    } else if (isError) {
        content = <p>{error}</p>
    }

    return (
        <main>
            <h1>Todo List</h1>
            
            <form onSubmit={onSubmitForm}>
                <label htmlFor="new-todo">Enter a new todo item</label>
                <div className="new-todo">
                    <input
                        type="text"
                        id="new-todo"
                        value={newTodo}
                        onChange={onChangeNewTodo}
                        placeholder="Enter new todo"
                    />
                </div>
                <button className="submit">
                    <FontAwesomeIcon icon={faUpload} />
                </button>
            </form>

            {content}
        </main>
    );
};

export default TodoList;