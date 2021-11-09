import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './Todolist.module.css'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeStatus: (isDone:boolean, tID:string) => void

}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState(true)

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const addTask = () => {
        props.addTask(title);
        setTitle("");
        setError(true)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => changeFilter("all");
    const onActiveClickHandler = () => changeFilter("active");
    const onCompletedClickHandler = () => changeFilter("completed");



    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? s.error : ''} value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.errorMessage}>Title is required</div>}
        </div>
        <ul>
            {
                tasksForTodolist.map(t => {
                    const onChangeHandlerForChangeStatus = (event: ChangeEvent<HTMLInputElement>, tID:string) =>
                    {props.changeStatus(event.currentTarget.checked, tID)}
                    const onClickHandler = () => props.removeTask(t.id)

                    return <li key={t.id}>
                        <input type="checkbox" onChange={(event)=>onChangeHandlerForChangeStatus(event,t.id)} checked={t.isDone}/>
                        <span className={t.isDone ? s.isDone : ''}>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={filter ==='all'? s.active_filter: ''} onClick={ onAllClickHandler }>All</button>
            <button className={filter ==='active'? s.active_filter: ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={filter ==='completed'? s.active_filter: ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
