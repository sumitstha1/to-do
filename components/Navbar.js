import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='h-[8vh] flex justify-between items-center w-[100vw]'>
            <nav className='navbar flex items-center justify-between h-[100%] w-[100%]'>
                <Link href={"/"}>
                    <div className="branding my-4 mx-4 flex items-center">
                        <Image src={"/next.svg"} alt='branding logo' height={100} width={100} className='w-16 md:w-24' />
                        <p className='md:text-3xl mx-3 text-xl'>To-Do</p>
                    </div>
                </Link>
                <div className="auth">
                    <Link href={"/user/login"}><button className='hover:text-purple-400 md:text-lg text-sm'>Login</button></Link>
                    <Link href={"/user/signup"}><button className='inline-flex text-white bg-purple-500 border-0 md:py-2 md:px-6 py-1 px-2 focus:outline-none hover:bg-purple-600 rounded md:text-lg text-sm mx-4 my-4'>Register</button></Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
