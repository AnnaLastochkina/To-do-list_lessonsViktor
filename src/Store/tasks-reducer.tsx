import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodolistAT, todolistID1, todolistID2} from "./todolists-reducer";

type RemoveTaskAT = {
    type:"REMOVE-TASK"
    taskId:string
    todolistId: string
}
type AddTaskTypeAT = {
    type: "ADD-TASK"
    title: string
    todolistId: string
}
type changeTaskStatusTypeAT = {
    type: "CHANGE-TASK-STATUS"
    todolistId: string
    taskId: string
    isDone: boolean

}

type changeTaskTitleTypeAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    title: string
    todolistId: string
}
export type ActionType = RemoveTaskAT | AddTaskTypeAT | changeTaskStatusTypeAT |
    changeTaskTitleTypeAT | AddTodoListAT | RemoveTodolistAT


export const RemoveTaskAC = (taskId:string,todolistId: string): RemoveTaskAT => {
    return { type: 'REMOVE-TASK',taskId:taskId, todolistId: todolistId}
}
export const addTaskAC = ( title:string, todolistId: string): AddTaskTypeAT => {
     return {type: "ADD-TASK", title, todolistId}
}
export const changeTaskStatusAC = ( todolistId: string, taskId:string, isDone:boolean,): changeTaskStatusTypeAT => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, isDone}
}

export const changeTaskTitleAC = (taskId:string, title:string, todolistId: string): changeTaskTitleTypeAT => {
    return {type: "CHANGE-TASK-TITLE",taskId, title, todolistId}
}

const initialState:TasksStateType = {
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
}

 export const tasksReducer = (state: TasksStateType = initialState, action: ActionType):TasksStateType => {
     switch (action.type) {
         case "REMOVE-TASK":{
             const stateCopy = {...state}
             const tasks = state[action.todolistId];
             const filteredTasks = tasks.filter(t => t.id !== action.taskId)
             stateCopy[action.todolistId] = filteredTasks
             return stateCopy;}
         case "ADD-TASK":{
             const stateCopy = {...state}
             const tasks = stateCopy[action.todolistId];
             const newTask = {id:v1(), title: action.title, isDone: false}
             const newTasks = [newTask,...tasks]
             stateCopy[action.todolistId] = newTasks
             return stateCopy;
         }
         case "CHANGE-TASK-STATUS":{
             let todolistTasks = state[action.todolistId]
         state[action.todolistId] = todolistTasks
             .map(t => t.id === action.taskId
             ? {...t, isDone:action.isDone}
             : t)
             return ({...state})
         }
         case "CHANGE-TASK-TITLE":{
             let todolistTasks = state[action.todolistId]
             state[action.todolistId] = todolistTasks
                 .map(t => t.id === action.taskId
                     ? {...t, title:action.title}
                     : t)
             return ({...state})}
         case "ADD-TODOLIST": {
             const stateCopy = {...state}
             stateCopy[action.todolistId] = []
             return stateCopy
         }
         case "REMOVE-TODOLIST": {
             const stateCopy = {...state}
             delete stateCopy[action.id]
             return stateCopy
         }
         default:
             return state
     }

 }