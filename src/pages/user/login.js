import callApi from '@/utils/callApi';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState, useContext } from 'react'
import { AiFillLock } from 'react-icons/ai';
import axios from 'axios';
import notify from '../../utils/notify';
import { STATUSCODES } from '../../../datas/statusCodes'
import { login } from '../../utils/auth';

const Login = () => {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();


        const success = await login(email, password);
        if (success) {
            router.push('/todo');
            notify("Login Successful!")
        } else {
            notify('Please try again', "error")
            console.log("error")
        }

    }

    const handleChange = (e) => {
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
        else if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
    }

    return (
        <div className='bg-image-login h-[92vh]'>
            <section className='main container  m-auto  h-[90vh]'>
                <div className=" flex justify-center items-center w-[100%] h-[90vh]">
                    <form onSubmit={handleSubmit} className='w-[90vw] md:w-[30vw]'>
                        <div className="form container md:w-[30vw] w-[100%] md:h-[50vh] h-[40vh] flex flex-col justify-center items-center rounded-3xl">
                            <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                                <label htmlFor="email" className='text-white md:text-base text-xs'>Email <span className='text-red-600'>*</span></label>
                                <input onChange={handleChange} type="email" name='email' id='email' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' placeholder='johndoe@gmail.com' />
                            </div>
                            <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                                <label htmlFor="password" className='text-white md:text-base text-xs'>Password <span className='text-red-600'>*</span></label>
                                <input onChange={handleChange} type="password" name='password' id='password' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' placeholder='********' />
                            </div>

                            <div className="flex flex-col w-[80vw] md:my-8 my-4 md:w-[20vw]">
                                <button type='submit' className='md:w-[10vw] w-[30vw] bg-purple-500 hover:bg-purple-800 delay-75 duration-200 transition ease-in-out px-2 py-2 rounded-full text-white flex items-center justify-center'>
                                    <div className='w-[20%] flex justify-start ml-0 md:ml-2'>
                                        <AiFillLock className='relative left-4' />
                                    </div>
                                    <div className='w-[80%] flex justify-center items-center md:relative md:-left-2 text-sm md:text-base'>
                                        Login
                                    </div>
                                </button>
                            </div>
                            <div className="flex flex-col w-[80vw] md:w-[20vw]">
                                <p className='text-white text-xs md:text-base'>Don&#39;t have account? <Link href={"/signup"} className='text-purple-300 hover:text-purple-500 transition-all'>click here</Link> to register</p>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Login
