import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (toDoListId: string, taskId: string) => void
    changeFilter: (toDoListId: string, value: FilterValuesType) => void
    addTask: (toDoListId: string, title: string) => void
    changeTaskStatus: (toDoListId: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    toDoListId: string
    removeToDoList: (toDoListId: string) => void
    changeTaskTitle:(taskId:string, toDoListId: string, title:string)=>void
    changeTodolistTitle:(toDoListId: string, title:string)=>void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.toDoListId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.toDoListId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.toDoListId, "completed");
    const removeToDoList = () => {
        props.removeToDoList(props.toDoListId)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.toDoListId)
    }
    const changeTodolistTitle = (title:string) => { props.changeTodolistTitle(props.toDoListId,title)}
    return <div>
        <h3>
            <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
            <button onClick={removeToDoList}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.toDoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.toDoListId, t.id, e.currentTarget.checked);
                    }
                    const changeTitle = (title:string) => {props.changeTaskTitle(t.id, props.toDoListId, title)}
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} setNewTitle={changeTitle}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
