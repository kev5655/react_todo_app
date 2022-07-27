import React from 'react'

const Todo = ({description, done, index, onChangeTodo, onDeleteTodo}) => {

  return (
    <div>
      <div className={
        done
          ? 'flex justify-between items-center p-2 bg-[#2a9d8f] text-white' 
          : 'flex justify-between items-center p-2 bg-[#e76f51] text-white'
        } >
        <p 
          className='text-lg cursor-pointer'
          onClick={() => {
            onChangeTodo(index)
          }}>
          {description}
        </p> 
        <button className='text-lg 
          rounded-xl 
          bg-gray-400 
          p-1 
          m-2 
          text-white'
          onClick={() => {
            onDeleteTodo(index)
          }}>
          Löschen
        </button>
      </div>
    </div>
  )
}

export default Todo;
