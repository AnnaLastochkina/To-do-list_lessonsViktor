import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, Icon, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete, DeleteOutline} from "@material-ui/icons";

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
        <Typography variant={"h6"} style={{fontWeight:'bold'}}>
            <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
            <IconButton onClick={removeToDoList}><Delete/></IconButton>

       </Typography>
        <AddItemForm addItem={addTask}/>

        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.toDoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.toDoListId, t.id, e.currentTarget.checked);
                    }
                    const changeTitle = (title:string) => {props.changeTaskTitle(t.id, props.toDoListId, title)}
                    return (
                        <List>
                    <ListItem key={t.id}
                              className={t.isDone ? "is-done" : ""}

                    >
                        <Checkbox
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} setNewTitle={changeTitle}/>

                        <IconButton onClick={onClickHandler}><DeleteOutline fontSize={'small'}/></IconButton>

                    </ListItem>
                        </List>
                )
                })
            }
        </ul>
        <div>
            <ButtonGroup variant={"contained"}
            size={"small"}
            >
            <Button color={props.filter === 'all' ? "secondary" : "primary"}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={props.filter === 'active' ? "secondary" : "primary"}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={props.filter === 'completed' ? "secondary" : "primary"}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </ButtonGroup>
        </div>
    </div>
}
