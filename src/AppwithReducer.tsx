import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, RemoveTodolistAC,
    todolistsReducer
} from "./Store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./Store/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [key:string]: Array<TaskType>
}

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();
    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })




    function removeTask(toDoListId: string, id: string) {

        dispatchToTasksReducer(RemoveTaskAC(id, toDoListId))
    }
    function addTask(title: string, toDoListId: string) {

        dispatchToTasksReducer(addTaskAC(title,toDoListId))
    }
    function changeStatus(toDoListId: string, taskId: string, isDone: boolean) {

        dispatchToTasksReducer(changeTaskStatusAC(toDoListId,taskId,isDone))
    }
    const changeTaskTitle = (taskId: string, toDoListId: string, title: string) => {

        dispatchToTasksReducer(changeTaskTitleAC(taskId,title,toDoListId))

    }



    function changeFilter(toDoListId: string, value: FilterValuesType) {

        dispatchToTodolistsReducer(ChangeTodolistFilterAC(toDoListId, value))
    }
    function changeTodolistTitle(toDoListId: string, title: string) {

        dispatchToTodolistsReducer(ChangeTodolistTitleAC(toDoListId,title))
    }
    const addTodoList = (title: string) => {
        const todolistId= v1()
        dispatchToTodolistsReducer(AddTodolistAC(title,todolistId))
        dispatchToTasksReducer(AddTodolistAC(title,todolistId))
    }
    let removeToDoList = (toDoListId: string) => {
        dispatchToTodolistsReducer(RemoveTodolistAC(toDoListId))
        dispatchToTasksReducer(RemoveTodolistAC(toDoListId))
    }

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
                    let tasksForTodolist = tasks[m.id];

                    if (m.filter === "active") {
                        tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
                    }
                    if (m.filter === "completed") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                    }
                    return (
                        <Grid item key={m.id}>
                            <Paper style={{padding:'10px'}} elevation={3} >
                        <Todolist

                            toDoListId={m.id}
                            title={m.title}
                            tasks={tasksForTodolist}
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

export default AppWithReducers;
