import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../API/todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodos()
            .then((res) => {
                setState(res.data);
            })

    }, [])


    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = (title: string) => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createtodo(title)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '14ea09b6-8584-4df2-b1bc-027aefc8aa81';
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '14ea09b6-8584-4df2-b1bc-027aefc8aa81'
    const title = '3333333'
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
