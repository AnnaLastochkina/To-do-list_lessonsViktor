import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC
} from "./Store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC} from "./Store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Store/store";

export type FilterValuesType = "all" | "active" | "completed";
export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [key:string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<todoListsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const removeTask = useCallback((toDoListId: string, id: string) => {

        dispatch(RemoveTaskAC(id, toDoListId))
    }, [])
    const  addTask = useCallback ((title: string, toDoListId: string) => {

        dispatch(addTaskAC(title,toDoListId))}, [dispatch])

    const changeStatus = useCallback((toDoListId: string, taskId: string, isDone: boolean) => {

        dispatch(changeTaskStatusAC(toDoListId,taskId,isDone))
    },[dispatch])
    const changeTaskTitle = useCallback((taskId: string, toDoListId: string, title: string) => {

        dispatch(changeTaskTitleAC(taskId,title,toDoListId))

    },[dispatch])



    const changeFilter = useCallback((toDoListId: string, value: FilterValuesType) => {

        dispatch(ChangeTodolistFilterAC(toDoListId, value))
    },[dispatch])
    const changeTodolistTitle = useCallback((toDoListId: string, title: string) => {
        dispatch(ChangeTodolistTitleAC(toDoListId,title))},[dispatch])
    const addTodoList = useCallback((title: string) => {
        const todolistId= v1()
        dispatch(AddTodolistAC(title,todolistId))

    },[dispatch])
    const removeToDoList = useCallback((toDoListId: string) => {
        dispatch(RemoveTodolistAC(toDoListId))},[dispatch])



    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding:'10px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                {todolists.map(m => {

                    return (
                        <Grid item key={m.id}>
                            <Paper style={{padding:'10px'}} elevation={3} >
                        <Todolist

                            toDoListId={m.id}
                            title={m.title}
                            tasks={tasks[m.id]}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={m.filter}
                            removeToDoList={removeToDoList}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}
                        />
                            </Paper>
                        </Grid>

                    )

                })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
