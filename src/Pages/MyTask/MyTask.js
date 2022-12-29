import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const MyTask = () => {

    const [tasks, setTasks] = useState([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetch('https://check-able-server.vercel.app/my-task')
            .then(res => res.json())
            .then(data => {
                setLoading(false)
                setTasks(data)
            })
    }, [])

    if (loading) {
        return <div className="w-16 flex my-20 ml-10 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>

    }


    const handleDeleteTask = (taskData) => {
        const confirm = window.confirm('Are You Sure To Delete Your Task')

        if (confirm) {
            fetch(`https://check-able-server.vercel.app/my-task/${taskData._id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('deleted successfully')
                    }
                })
        }
    }

    const handleSendTaskComplete = (data) => {

        const completeData = {
            name: data.text,
            image: data.image,
            date: data.date
        }

        fetch(`https://check-able-server.vercel.app/complete-task`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(completeData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Your Task Complete')
                }
            })
            .catch(e => toast.error(e.message))
    }

    return (
        <div className='py-20'>
            <h2 className='text-center text-3xl font-bold text-green-600'>My Tasks</h2>
            <div className='mt-10 w-10/12 mx-auto'>
                {
                    tasks.map(task =>
                        <div key={task._id}>
                            <div className='md:flex justify-between items-center mb-4 text-white bg-gray-800 p-4 rounded-lg'>
                                <img src={task.image} className="w-20 rounded-full h-20 object-cover mr-6" alt="" />
                                <div>
                                    <h3 className='text-xl font-bold mb-1'>{task.text}</h3>
                                    <p>{task.date.slice(0, 22)}</p>
                                </div>

                                <div>
                                    <Link to={`/update-task/${task._id}`}>
                                        <button className='bg-white text-gray-800 px-4 py-2 font-bold rounded-sm block'>Update</button>
                                    </Link>
                                    <button className='bg-white text-gray-800 px-4 py-2 font-bold rounded-sm block mt-2' onClick={() => handleDeleteTask(task)}>Delete</button>
                                </div>

                                <div>
                                    <button onClick={() => handleSendTaskComplete(task)} className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out cursor-pointer mt-4 w-full">
                                        Complete
                                    </button>
                                </div>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default MyTask;