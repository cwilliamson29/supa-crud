import React, {useState} from 'react'
import {FaRegEdit, FaRegSave} from "react-icons/fa";
import {MdDeleteForever} from "react-icons/md";

function ListTodosEditMode({todo, handleDelete, handleEdit}) {
    const [editing, setEditing] = useState(false);
    const [editTodo, setEditTodo] = useState(todo)

    //console.log(todo)
    const handleSave = (e) => {
        e.preventDefault();
        if (editing) {
            handleEdit(editTodo);
        }
        setEditing(!editing);
    }
    const handleEditMode = (e) => {
        e.preventDefault();
        setEditing(!editing);
    }
    const handleCompleted = () => {
        // const todos = editTodo;
        // todos.isCompleted = !editTodo.isCompleted;

        // setEditTodo({...editTodo, isCompleted: !editTodo.isCompleted});
        handleEdit({...todo, isCompleted: !todo.isCompleted});
    }

    return (
        <form className="flex justify-between p-1 mb-1 border-b-1 border-gray-600" onSubmit={(e) => handleSave(e)}>
            <div className="flex w-full">
                <input type="checkbox" className="mr-2 w-4" checked={todo.isCompleted} onChange={() => handleCompleted()}/>
                {editing ?
                    <input type="text" placeholder="Add your note here..." className="border-b-1 m-3 w-full focus:outline-none focus:border-b-1" autoFocus={true}
                           value={editTodo.todo_text}
                           onChange={(e) => setEditTodo({...editTodo, todo_text: e.target.value})}/>
                    :
                    <li className={todo.isCompleted ? "ml-3 m-auto line-through text-gray-500" : "ml-3 m-auto"}>{todo.todo_text}</li>
                }
            </div>

            <div className="flex">
                <MdDeleteForever size="25px" className="text-red-500 mr-2 cursor-pointer m-auto" onClick={() => handleDelete(todo.id)}/>

                {editing ?
                    <FaRegSave className="cursor-pointer m-auto" color="green" size="25px" onClick={(e) => handleSave(e)}/>
                    :
                    <FaRegEdit className="cursor-pointer" size="25px" color="yellow" onClick={(e) => handleEditMode(e)}/>
                }

            </div>
        </form>
    )
}

export default ListTodosEditMode
