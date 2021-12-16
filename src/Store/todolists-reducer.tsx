import {FilterValuesType, todoListsType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTodolistTitletype = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
type ChangeTodolistFilter = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

export type ActionType = RemoveTodolistAT | AddTodoListAT | ChangeTodolistTitletype | ChangeTodolistFilter


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (newTodolistTitle: string, todolistId: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, todolistId: todolistId}
}
export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: id,
        title: title
    }
};

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER' as const,
        id: id,
        filter: filter
    }
}


export const todolistsReducer = (state: Array<todoListsType>, action: ActionType): Array<todoListsType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]

        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                //если нашелся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER' : {
            const todolist = state.find(tl => tl.id === action.id)
            if (todolist)
                // если нашелся - изменит ему заголовок
            {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            return state
    }


}



