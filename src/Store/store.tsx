import {combineReducers, createStore} from "redux";
import { tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TasksStateType, todoListsType} from "../App";


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>


export const store = createStore(rootReducer)


//@ts-ignore
window.store = store


