import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../Assets/logo.png'
import { ImCross } from 'react-icons/im';
import { AiOutlineAlignRight } from 'react-icons/ai';


const NavBar = () => {

    const [open, setOpen] = useState(false);

    const links = [
        { id: 1, name: 'Add Task', path: '/' },
        { id: 1, name: 'My Task', path: '/my-task' },
        { id: 1, name: 'Completed Tasks', path: '/complete-tasks' },
    ]

    return (
        <div className='flex justify-around items-center sticky top-0 z-10 p-7 bg-white'>
            <div className='flex justify-center items-center'>
                <img src={logo} className='w-16 rounded-full mr-4' alt="" />
                <Link to='/' className='text-violet-400 font-bold text-3xl'>Check Able</Link>
            </div>
            <div className="h-6 w-6 md:hidden" onClick={() => setOpen(!open)}>
                {
                    open
                        ?
                        <ImCross />
                        :
                        <AiOutlineAlignRight />
                }
            </div>
            <ul className={`md:flex justify-center absolute md:static duration-500 ease-out ${open ? 'top-16 bg-slate-400 p-6' : 'top-[-120px]'}`}>
                {
                    links.map(link => <NavLink end key={link.id} className={({ isActive }) => isActive ? 'mr-8 text-xl font-semibold border-t-4 md:p-4 border-sky-500 text-sky-700' : 'mr-8 text-xl font-semibold'} to={link.path}>{link.name}</NavLink>)
                }
            </ul>
        </div>
    );
};

export default NavBar;