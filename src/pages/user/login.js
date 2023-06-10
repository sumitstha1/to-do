import Link from 'next/link'
import React from 'react'
import { AiFillLock } from 'react-icons/ai';

const Login = () => {
    return (
        <div className='bg-image-login h-[92vh]'>
            <section className='main container  m-auto  h-[90vh]'>
                <div className=" flex justify-center items-center w-[100%] h-[90vh]">
                    <form action="/" className='w-[90vw] md:w-[30vw]'>
                        <div className="form container md:w-[30vw] w-[100%] md:h-[50vh] h-[40vh] flex flex-col justify-center items-center rounded-3xl">
                            <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                                <label htmlFor="email" className='text-white md:text-base text-xs'>Email <span className='text-red-600'>*</span></label>
                                <input type="email" name='email' id='email' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' />
                            </div>
                            <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                                <label htmlFor="password" className='text-white md:text-base text-xs'>Password <span className='text-red-600'>*</span></label>
                                <input type="password" name='password' id='password' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' />
                            </div>

                            <div className="flex flex-col w-[80vw] md:my-8 my-4 md:w-[20vw]">
                                <button className='md:w-[10vw] w-[30vw] bg-purple-500 px-2 py-2 rounded-full text-white flex items-center justify-center'>
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
