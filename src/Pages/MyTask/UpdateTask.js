import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateTask = () => {

    const [startDate, setStartDate] = useState(new Date())


    const taskData = useLoaderData()
    const navigate = useNavigate()

    const handleSubmitAddTask = (e) => {
        e.preventDefault()

        const name = e.target.name.value

        const updateData = {
            name,
            startDate
        }

        fetch(`https://check-able-server.vercel.app/my-task/${taskData._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updateData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("User Update Successfully")
                    navigate('/my-task')
                }
            })

    }

    return (
        <div className='my-20 w-10/12 md:w-8/12 lg:w-6/12 mx-auto'>
            <form onSubmit={handleSubmitAddTask}>
                <div>
                    <label className='block mb-2 text-xl font-bold text-teal-600' htmlFor="name">Update Task</label>
                    <input type="text" name='name' id='name' placeholder={taskData.text} className='w-full border-2 rounded-xl border-teal-600 py-4 px-6 text-teal-600 font-semibold' required />
                </div>
                <div className='mt-6'>
                    <DatePicker className='bg-teal-400 w-full p-3 rounded-md font-bold' selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <input type="submit" value="Add Your Task" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer mt-4 w-full" />
            </form>
        </div>
    );
};

export default UpdateTask;