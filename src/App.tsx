import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todoListsType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {

    /*let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);*/
    let todolistID1 = v1();
    let todolistID2 = v1();
   let [todolists, setTodolists] = useState<Array<todoListsType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])


   let [tasks, setTasks] = useState({
       [todolistID1]:[
       {id: v1(), title: "HTML&CSS", isDone: true},
       {id: v1(), title: "JS", isDone: true},
       {id: v1(), title: "ReactJS", isDone: false},
       {id: v1(), title: "Rest API", isDone: false},
       {id: v1(), title: "GraphQL", isDone: false},
   ],
       [todolistID2]:[
           {id: v1(), title: "HTML&CSS2", isDone: true},
           {id: v1(), title: "JS2", isDone: true},
           {id: v1(), title: "ReactJS2", isDone: false},
           {id: v1(), title: "Rest API2", isDone: false},
           {id: v1(), title: "GraphQL2", isDone: false},
       ]})


    function removeTask(toDoListId: string, id: string) {
        setTasks({...tasks, [toDoListId]:tasks[toDoListId].filter(f => f.id!==id)});

    }

    function addTask(toDoListId: string, title: string) {
       setTasks({...tasks, [toDoListId]:[{id:v1(), title:title, isDone: false},...tasks[toDoListId]]})
    }

    function changeStatus(toDoListId: string, taskId: string, isDone: boolean) {
       setTasks({...tasks,[toDoListId]:tasks[toDoListId].map(m => m.id === taskId ? {...m,isDone:isDone} : m ) })
    }


    function changeFilter(toDoListId: string, value: FilterValuesType) {
        setTodolists(todolists.map( m => m.id === toDoListId ? {...m,filter:value}: m))
       }


    return (
        <div className="App">
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
                        toDoListId = {m.id}
                        title={m.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={m.filter}/>

                )
            })}


        </div>
    );
}

export default App;
