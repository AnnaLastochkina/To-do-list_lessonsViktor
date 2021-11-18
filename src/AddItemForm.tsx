import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import './App.css'

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
            <input value={title}
                   placeholder='Enter title..'
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">Title is Required!</div>}
        </div>

    )
}

