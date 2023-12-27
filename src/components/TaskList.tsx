import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskItemModel } from '../model/todo.model'
import { TodoState, changePosition } from '../store/todo/todoSlice';
import TaskItem from './TaskItem';
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';

export default function TaskList() {
  const taskList: Array<TaskItemModel> = useSelector((state: { todo: TodoState }) => state.todo.taskList);
  const type = useSelector((state: { todo: TodoState }) => state.todo.currentFilter);
  const dispatch = useDispatch();
  const [taskViewData, setTaskViewData] = useState<Array<TaskItemModel>>([]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );


  useEffect(() => {
    let data;
    switch (type) {
      case 'pending':
        data = taskList.filter((task) => task.type === 'pending');
        break;
      case 'done':
        data = taskList.filter((task) => task.type === 'done');
        break;
      default:
        data = taskList;
    }
    setTaskViewData(data);
  }, [type, taskList])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = taskList.findIndex((item) => item.id === active.id)
      const newIndex = taskList.findIndex((item) => item.id === over.id)

      const newTaskList = arrayMove(taskList, oldIndex, newIndex);
      dispatch(changePosition(newTaskList));
    }
  }

  return (
    <>
      <div className="text-xs text-slate-400">{taskViewData.length} tasks</div>
      <div className='mt-5'>
        {taskViewData && taskViewData.length ?
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={taskViewData}
              strategy={verticalListSortingStrategy}
            >
              <div className='flex flex-col gap-3'>
                {taskViewData.map((taskData: TaskItemModel) => <TaskItem key={taskData.id} data={taskData} />)}
              </div>
            </SortableContext>
          </DndContext>
          :
          <p className='text-center opacity-70 text-xs'>No task items found. Get started by adding a new task!</p>
        }
      </div>
    </>
  )
}
