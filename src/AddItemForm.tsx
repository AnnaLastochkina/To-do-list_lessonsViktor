import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import './App.css'
import {Button, IconButton, TextField} from "@material-ui/core";
import {Add, AddBox, ControlPoint, PlusOne} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem:(title:string)=> void

}
export const AddItemForm = (props:AddItemFormPropsType)  =>{
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean|string>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            addItem();
        }
    }
    return (
        <div>
            <TextField
                   value={title}
                   label="Type your task"
                   variant="outlined"
                   size={'small'}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   error={!!error}
                   helperText={error}
            />
            <IconButton onClick={addItem}><ControlPoint fontSize={'medium'}/></IconButton>
        </div>

    )
}

