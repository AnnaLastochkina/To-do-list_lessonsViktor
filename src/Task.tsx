import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {DeleteOutline} from "@material-ui/icons";
import {TaskType} from "./Todolist";


export type TaskPropsType ={
    changeTaskStatus:(toDoListId:string, taskId:string, isDone:boolean ) => void
    changeTaskTitle:(taskId: string,toDoListId:string,title:string ) =>void
    task: TaskType
    removeTask:(taskId: string,toDoListId: string) => void
    toDoListId:string

}


export const Task = React.memo((props:TaskPropsType) => {


    const onClickHandler = () => props.removeTask(props.toDoListId, props.task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.toDoListId, props.task.id,e.currentTarget.checked )}
    const changeTitle = useCallback((title:string) => {props.changeTaskTitle(props.task.id, props.toDoListId, title)},
        [props.task.id,props.toDoListId,props.changeTaskTitle])



    return (

        <List>
            <ListItem key={props.task.id}
                      className={props.task.isDone ? "is-done" : ""}

            >
                <Checkbox
                    onChange={onChangeHandler}
                    checked={props.task.isDone}/>
                <EditableSpan title={props.task.title} setNewTitle={changeTitle}/>

                <IconButton onClick={onClickHandler}><DeleteOutline fontSize={'small'}/></IconButton>

            </ListItem>
        </List>
    )
})
