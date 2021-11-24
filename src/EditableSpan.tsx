import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {IconButton, TextField} from "@material-ui/core";
import {Edit} from "@material-ui/icons";

type editableSpanPropsType = {
    title: string
    setNewTitle: (title:string) => void
}

export const EditableSpan = (props: editableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const changeTitle = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
}
    return (
        editMode ?
            <TextField
                size={'small'}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange = {changeTitle}
            />
            :
            <span onDoubleClick={onEditMode}>{props.title}
                </span>

)

}
