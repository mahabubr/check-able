import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Contexts/AuthProvider';
import { AiOutlineGoogle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const { createUser, updateAccount, googleCreateAccount } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSignUp = e => {
        e.preventDefault()

        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value

        createUser(email, password)
            .then(result => {
                const user = result.user
                toast.success("Account Created")
                updateAccount(name)
                    .then(() => {
                        toast.success("Profile Updated")
                        e.target.reset()
                        navigate('/')
                    })
            })
            .catch(e => toast.error(e.message))

    }

    const handleGoogleSignIn = () => {
        googleCreateAccount()
            .then(result => {
                toast.success('Google Sign In Success')
                navigate('/')
            })
            .catch(e => toast.error(e.message))
    }

    return (
        <div className='my-20'>
            <h2 className='text-center text-3xl font-bold text-green-600'>Sign Up</h2>
            <form onSubmit={handleSignUp} className='w-10/12 md:w-8/12 lg:w-6/12 mx-auto mt-10 space-y-3'>
                <input type="text" name='name' placeholder='Full Name' required className='border-2 w-full p-2 rounded-md ' />
                <input type="email" name='email' placeholder='Email' required className='border-2 w-full p-2 rounded-md ' />
                <input type="password" name='password' placeholder='******' required className='border-2 w-full p-2 rounded-md ' />
                <input type="submit" value="Sign Up" className='bg-gray-800 text-white p-4 font-bold rounded-sm hover:bg-gray-900 duration-300 ease-in-out cursor-pointer w-full' />
                <div onClick={handleGoogleSignIn} className='flex justify-center items-center text-orange-600 border-2 border-orange-600 p-2 rounded-full cursor-pointer'>
                    <AiOutlineGoogle className='text-4xl' />
                    <p className='text-xl font-bold'>Google Sign In</p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;