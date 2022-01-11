import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        // Не забываем заменить API-KEY на собственный
        'API-KEY': '1cdd9f77-c60e-4af5-b194-659e4ebd5d41'
    }
})

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    fieldsErrors: Array<string>
    messages:Array<string>
    resultCode: number
    data: T
}


export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoType>>('/todo-lists')

    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{item: TodoType}>>(`/todo-lists/${todolistId}`, {title})

    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)

    },
    createtodo(title: string) {
        return instance.post<ResponseType>('/todo-lists',
            {title})
    }
}

