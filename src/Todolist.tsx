import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, IconButton, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
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

export const Todolist = React.memo((props: PropsType) => {

    const onAllClickHandler = useCallback(() => props.changeFilter(props.toDoListId, "all"),[props.changeFilter,props.toDoListId]);
    const onActiveClickHandler =  useCallback(() =>props.changeFilter(props.toDoListId, "active"),[props.changeFilter,props.toDoListId]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.toDoListId, "completed"),[props.changeFilter,props.toDoListId]);
    const removeToDoList = () => {
        props.removeToDoList(props.toDoListId)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.toDoListId)},[props.addTask,props.toDoListId])

    const changeTodolistTitle = (title:string) => { props.changeTodolistTitle(props.toDoListId,title)}

    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone);
    }

    return <div>
        <Typography variant={"h6"} style={{fontWeight:'bold'}}>
            <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
            <IconButton onClick={removeToDoList}><Delete/></IconButton>

       </Typography>
        <AddItemForm addItem={addTask}/>

        <ul>

            {

                tasksForTodolist.map(t => <Task changeTaskStatus={props.changeTaskStatus}
                          changeTaskTitle={props.changeTaskTitle}
                          task={t}
                          removeTask={props.removeTask}
                          toDoListId={props.toDoListId}
                    key = {props.toDoListId}/>
                )
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
})
