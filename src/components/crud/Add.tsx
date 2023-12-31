import { useState } from 'react'
import Button from '../Button';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/todo/todoSlice';
import { CrudFormModel } from '../../model/crud.model';
import DatePicker from 'react-datepicker';

export default function Add() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { control, register, handleSubmit, reset: resetForm, formState: { errors } } = useForm<CrudFormModel>();
  const onSubmit: SubmitHandler<CrudFormModel> = async (submitData) => {
    await dispatch(addTask({...submitData,due: submitData.due?.toJSON()}))
    return handleClose();
  }
  const handleClose = () => {
    setIsOpen(false)
    resetForm()
  }
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add</Button>
      {isOpen &&
        <>
          <div className=" fixed z-50 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 w-1/3 rounded-xl">
            <p className="text-xl font-semibold">Add task</p>
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
              <Button onClick={() => { handleSubmit(onSubmit) }}>Submit</Button>
            </form>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" onClick={handleClose}></div>
        </>
      }
    </>
  )
}
