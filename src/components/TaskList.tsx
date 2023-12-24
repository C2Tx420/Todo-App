import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TaskItemModel } from '../store/todo/model'

export default function TaskList() {
  const taskList: Array<TaskItemModel> = useSelector((state: { taskList: Array<TaskItemModel> }) => state.taskList);
  const type = useSelector((state: { currentFilter: string }) => state.currentFilter);
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
      {taskViewData && taskViewData.length ?
        <div></div>
        :
        <div className='text-center opacity-70 text-xs mt-5'>No task items found. Get started by adding a new task!</div>
      }
    </>
  )
}
