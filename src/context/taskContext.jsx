import { createContext, useContext, useState } from 'react'
import {v4 as uuid} from 'uuid'

export const TaskContext = createContext()

export const useTasks = () => {
  return useContext(TaskContext)
}

export const TasksProvider = ({children}) => {
 const [tasks, setTasks] = useState([{id: '1', title: 'first task', description: 'some task'}]) 

  function createTask(title, description){
    setTasks([...tasks, {title, description, id: uuid()}])
  }

  function updateTask(id, updatedTask) {
    setTasks([...tasks.map(task => task.id === id ? {...task, ...updatedTask} : task)])
  }

  function deleteTask(id) {
    setTasks([...tasks.filter(task => task.id !== id)])
  }

  return (
    <TaskContext.Provider value={{tasks, createTask, updateTask, deleteTask}}>
      {children}
    </TaskContext.Provider>
  )

}
