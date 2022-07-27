
import React from 'react'
import Todo from "./Todo"
import { useState, useEffect } from 'react'



const TodoList = () => {

    const [getOpenCount, setOpenCount] = useState(0)
    const [getTodos, setTodos] = useState(() => {
        const items = localStorage.getItem("items")
        const parsed = JSON.parse(items);
        return parsed || []
    })
    const [getTextInput, setTextInput] = useState("")

    const countOpen = () => {
        const doneTodos = getTodos.filter((item) => {
            return !item.done
        })
        setOpenCount(doneTodos.length)
    }

    useEffect(() => {
        countOpen()
        localStorage.setItem("items", JSON.stringify(getTodos))
    }, [getTodos])

    const changeTodo = (index) => {
        const newTodos = [...getTodos]
        if(newTodos[index].done){
            newTodos[index].done = false
        } else {
            newTodos[index].done = true
        }
        setTodos(newTodos)
    }

    const deleteTodo = (index) => {
        const newTodos = [...getTodos]
        newTodos.splice(index, 1)
        setTodos(newTodos)
    }

    const changeText = (e) => {
        setTextInput(e.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        const newTodos = [...getTodos, {description: getTextInput, done: false}]
        setTodos(newTodos)
        setTextInput("")
    }

    return (
        <div className="shadow-sm  hover:shadow-lg ">
            <div className="text-center 
                            border-gray-900 
                            rounded-t-xl 
                            bg-gray-900 
                            text-white 
                            py-4 
                            font-semibold">
                <h1 className='text-3xl'>Meine Todo's</h1>
                <h2>Offene Todos: {getOpenCount}</h2>
                <from className='grid grid-cols-3 p-2'>
                    <input type='text' 
                        placeholder='Neues Todo...'
                        value={getTextInput}
                        onChange={changeText}
                        className='col-span-2 
                            py-2
                            pl-3
                            m-2
                            rounded-xl
                            text-gray-900 
                            bg-gray-400'></input>
                    <input type='submit' 
                        value='Add Todo'
                        onClick={submit}
                        className='col-span-1 
                            m-2
                            rounded-xl
                            cursor-pointer
                            text-gray-900 
                            bg-gray-400'></input>
                </from>
            </div>
            {getTodos.map((todo, index) => {
                return ( 
                        <Todo 
                            description={todo.description} 
                            done={todo.done} 
                            key={index}
                            index={index}
                            onChangeTodo={changeTodo}
                            onDeleteTodo={deleteTodo}>
                        </Todo>
                    )
            })}
        </div>
    )
}


export default TodoList;
