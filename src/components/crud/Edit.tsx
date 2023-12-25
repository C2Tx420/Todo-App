import { useEffect, useState } from 'react'
import { CrudFormModel } from '../../model/crud.model';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editTask } from '../../store/todo/todoSlice';
import { TaskItemModel } from '../../model/todo.model';
import Button from '../Button';
import DatePicker from 'react-datepicker';

export default function Edit({ data }: { data: TaskItemModel }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { control, register, handleSubmit, reset: resetForm, formState: { errors }, setValue } = useForm<CrudFormModel>();
  const onSubmit: SubmitHandler<CrudFormModel> = async (submitData) => {
    await dispatch(editTask({ ...data, ...submitData, due: submitData.due?.toJSON() }))
    return handleClose();
  }
  const handleClose = () => {
    setIsOpen(false)
    resetForm()
  }

  useEffect(() => {
    setValue('title', data.title);
    setValue('description', data.description);
    setValue('due', data.due ? new Date(data.due) : undefined);
  }, [data.description, data.due, data.title])
  return (
    <>
      <div
        className="w-9 h-9 rounded-md font-bold flex items-center justify-center border-2 border-black duration-200 cursor-pointer bg-[#D7DB1E] hover:opacity-70 hover:duration-200"
        onClick={() => { setIsOpen(true) }}
      >
        E
      </div>
      {isOpen &&
        <>
          <div className=" fixed z-50 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-1/3 rounded-xl">
            <p className="text-xl font-semibold">Edit task</p>
            <div className="h-0.5 bg-black w-full mb-3" />
            <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p>Title:<span className='text-red-500'>*</span></p>
                <input
                  type="text"
                  className='mt-1 border w-full p-1'
                  {...register("title", { required: true })}
                />
                {errors.title && <p className='text-red-500 text-xs'>Title is required</p>}
              </div>
              <div>
                <p>Description:<span className='text-red-500'>*</span></p>
                <input
                  type="text"
                  className='mt-1 border w-full p-1'
                  {...register("description", { required: true })}
                />
                {errors.description && <p className='text-red-500 text-xs'>Description is required</p>}
              </div>
              <div>
                <p>Due:</p>
                <Controller
                  control={control}
                  name='due'
                  render={({ field }) => (
                    <div className='mt-1 border w-full p-1'>
                      <DatePicker
                        placeholderText='Select date'
                        onChange={(date) => field.onChange(date)}
                        selected={field.value}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                      />
                    </div>
                  )}
                />
              </div>
              <Button onClick={() => { handleSubmit(onSubmit) }}>Update</Button>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={handleClose}></div>
        </>
      }
    </>
  )
}