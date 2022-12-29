import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { toast } from 'react-hot-toast';


const AddTask = () => {

    const [startDate, setStartDate] = useState(new Date())

    const handleSubmitAddTask = (e) => {
        e.preventDefault()

        const form = e.target

        const text = form.name.value
        const image = form.image.files[0]
        const formData = new FormData()
        formData.append('image', image)

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMAGE_BB}`, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {

                    const sendData = {
                        text,
                        image: data.data.url,
                        date: startDate
                    }

                    fetch('https://check-able-server.vercel.app/my-task', {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(sendData)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged) {
                                form.reset()
                                toast.success('Your Task Added Successfully')
                            }
                        })
                        .catch(e => toast.error(e.message))

                }
            })
            .catch(e => toast.error(e.message))

    }

    return (
        <div className='py-28 w-10/12 md:w-8/12 lg:w-6/12 mx-auto'>
            <form onSubmit={handleSubmitAddTask}>
                <div>
                    <label className='block mb-2 text-xl font-bold text-teal-600' htmlFor="name">Add Task</label>
                    <input type="text" name='name' id='name' placeholder='Add Your Task' className='w-full border-2 rounded-xl border-teal-600 py-4 px-6 text-teal-600 font-semibold' required />
                </div>
                <div className='mt-6 flex justify-between items-center'>
                    <div>
                        <input type="file" name='image' className='p-2 rounded-lg' required />
                    </div>
                    <div>
                        <DatePicker className='bg-teal-400 p-3 rounded-md font-bold' selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                <input type="submit" value="Add Your Task" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer mt-4 w-full" />
            </form>
        </div>
    );
};

export default AddTask;