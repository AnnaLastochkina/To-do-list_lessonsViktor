import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();
    let [todolists, setTodolists] = useState<Array<todoListsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState({
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

    let removeToDoList = (toDoListId: string) => {
        let filteredToDolist = todolists.filter(tl => tl.id !== toDoListId)
        setTodolists(filteredToDolist);
        delete tasks[toDoListId];
        setTasks({...tasks})
    }
    const addTodoList = (title: string) => {
        const toDoListId = v1()
        const newTodoList: todoListsType = {
            id: toDoListId,
            title: title,
            filter: 'all'
        }
        setTodolists([...todolists, newTodoList])
        setTasks({...tasks, [toDoListId]: []})
    }

    function removeTask(toDoListId: string, id: string) {
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].filter(f => f.id !== id)});

    }

    function addTask(title: string, toDoListId: string) {

        setTasks({...tasks, [toDoListId]: [{id: v1(), title: title, isDone: false}, ...tasks[toDoListId]]})
    }

    function changeStatus(toDoListId: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].map(m => m.id === taskId ? {...m, isDone: isDone} : m)})
    }

    const changeTaskTitle = (taskId:string, toDoListId: string, title:string) => {
        setTasks({...tasks, [toDoListId]: tasks[toDoListId].map(m => m.id === taskId ? {...m, title: title} : m)})
    }


    function changeFilter(toDoListId: string, value: FilterValuesType) {
        setTodolists(todolists.map(m => m.id === toDoListId ? {...m, filter: value} : m))
    }
    function changeTodolistTitle(toDoListId: string, title:string) {
        setTodolists(todolists.map(m => m.id === toDoListId ? {...m, title: title} : m))
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todolists.map(m => {
                let tasksForTodolist = tasks[m.id];

                if (m.filter === "active") {
                    tasksForTodolist = tasks[m.id].filter(t => !t.isDone);
                }
                if (m.filter === "completed") {
                    tasksForTodolist = tasks[m.id].filter(t => t.isDone);
                }
                return (

                    <Todolist
                        key={m.id}
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


                )
            })}


        </div>
    );
}

export default App;
