import Layout from '../components/Layout'
import { useState, useEffect } from 'react';
import { useTasks } from '../context/taskContext'
import { useRouter } from 'next/router';

function TaskFormPage() {

  const [task, setTask] = useState({
    title: '',
    description: '',
  })

  const {createTask, updateTask, tasks} = useTasks()
  const router = useRouter()

  useEffect(() => {
    if (router.query.id) {
      const taskFound = tasks.find(task => task.id === router.query.id)
      setTask({title: taskFound.title, description: taskFound.description})
    }

  }, [])
  
  function handleChange(e) {
    const {name, value} = e.target
    setTask({
        ...task, 
        [name]: value
      })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!router.query.id) {
      createTask(task.title, task.description)
    } else{
      updateTask(router.query.id, task)
    }

    router.push('/')
  }

  return (
    <Layout>
      <div className="flex justify-center items-center h-full">
      <form onSubmit={handleSubmit} className='bg-gray-700 p-10 h-2/4'>
        <h1 className='text-3xl mb-7'>{router.query.id ? 'Update a Task' : 'Create a Task'}</h1>

        <input 
          type='text' 
          placeholder='Write a title' 
          name='title'
          value={task.title}
          className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
          onChange={handleChange}
        />

        <textarea 
          rows='2'
          placeholder='Write a description'
          name='description'
          value={task.description}
          className='bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5'
          onChange={handleChange}
          ></textarea>

          <button className='bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30' disabled={!task.title}>
            Save
          </button>
      </form>
      </div>
    </Layout>
  )
}




export default TaskFormPage