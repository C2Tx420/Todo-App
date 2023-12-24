import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TaskItemModel } from '../model/todo.model'
import { TodoState } from '../store/todo/todoSlice';
import TaskItem from './TaskItem';

export default function TaskList() {
  const taskList: Array<TaskItemModel> = useSelector((state: { todo: TodoState }) => state.todo.taskList);
  const type = useSelector((state: { todo: TodoState }) => state.todo.currentFilter);
  const [taskViewData, setTaskViewData] = useState<Array<TaskItemModel>>([]);

  useEffect(() => {
    switch (type) {
      case 'pending':
        break;
      case 'done':
        break;
      default:
        setTaskViewData(taskList);
    }
  }, [type, taskList])
  return (
    <>
      <div className="text-xs text-slate-400">{taskViewData.length} tasks</div>
      <div className='mt-5'>
        {taskViewData && taskViewData.length ?
          <div className='flex flex-col gap-3'>
            {taskViewData.map((taskData: TaskItemModel, idx: number) => <TaskItem key={idx} data={taskData} />)}
          </div>
          :
          <p className='text-center opacity-70 text-xs'>No task items found. Get started by adding a new task!</p>
        }
      </div>
    </>
  )
}
