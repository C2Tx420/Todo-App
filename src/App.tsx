import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import { todoTypeList } from './config/todoType'
import { TodoState, changeFilter, initTaskList } from './store/todo/todoSlice';
import Add from './components/crud/Add';
import TaskList from './components/TaskList';
import { useEffect } from 'react';

function App() {
  const todoData = useSelector((state: { todo: TodoState }) => state.todo);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(initTaskList());
  },[])
  return (
    <div className='container'>
      <h1 className="font-bold text-2xl py-5 text-center">TodoList-App</h1>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {todoTypeList.map((item: { label: string, value: string }, idx: number) =>
              <div key={idx} className={`cursor-pointer ${todoData.currentFilter === item.value ? 'font-semibold border-b border-black transition duration-500' : ''}`} onClick={() => { dispatch(changeFilter(item.value)) }}>
                {item.label}
              </div>
            )}
          </div>
          <Add />
        </div>
        <div className="w-full h-1 bg-black mt-3" />
        <TaskList/>
      </div>
    </div>
  )
}

export default App
