import React from 'react'
import { TaskItemModel } from '../model/todo.model'
import { useDispatch } from 'react-redux'
import { changeType, removeTask } from '../store/todo/todoSlice';
import Edit from './crud/Edit';

export default function TaskItem({ data }: { data: TaskItemModel }) {
  const dispatch = useDispatch();
  const handleChangeType = async () => {
    return await dispatch(changeType(data))
  }
  const handleRemove = async () => {
    return await dispatch(removeTask(data.id));
  }
  return (
    <div className="flex items-center justify-between p-5 border-2 border-black rounded-md shadow-md">
      <div className="flex items-center gap-5">
        <div className={
          `border-2 border-black rounded-md w-10 h-10 flex items-center justify-center cursor-pointer duration-200 
          hover:duration-200 hover:opacity-70 
          ${data.type === 'done' ? 'bg-[#5BDC2E]' : 'hover:bg-slate-400'}`
        }
          onClick={handleChangeType}
        >
          {data.type === 'done' && (
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
              <mask id="mask0_1_37" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="35">
                <rect width="35" height="35" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1_37)">
                <path d="M13.9271 26.25L5.61456 17.9375L7.69269 15.8594L13.9271 22.0938L27.3073 8.71355L29.3854 10.7917L13.9271 26.25Z" fill="#1C1B1F" />
              </g>
            </svg>)}
        </div>
        <div>
          <p className='text-lg font-medium leading-none'>{data.title}</p>
          <p className='opacity-70 leading-none'>{data.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Edit data={data} />
        <div
          className="w-9 h-9 rounded-md font-bold flex items-center justify-center border-2 border-black duration-200 cursor-pointer bg-[#E43434] hover:opacity-70 hover:duration-200"
          onClick={handleRemove}
        >
          X
        </div>
      </div>
    </div>
  )
}
