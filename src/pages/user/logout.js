import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { logout } from '../../utils/auth';
import callApi from '../../utils/callApi';
import notify from '@/utils/notify';
import withAuth from '../../utils/withAuth';

const Logout = () => {

    const [refresh_token, setRefreshToken] = useState('');

    const router = useRouter();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setRefreshToken(localStorage.getItem('refresh_token'));

        const data = { refresh_token }

        const log = callApi(process.env.API_URL + '/api/v1/account/logout/', data, "POST");

        logout();

        if (log) {
            router.push("/")
        }
        else {
            notify("Something went wrong.", "error")
        }
        
    }

    const handleCancel = (e) => {
        router.push("/todo")
        notify("You choosed not to logout...")
    }

    console.log(refresh_token)

    return (
        <div className='bg-image-login h-[92vh]'>
            <section className='main container  m-auto  h-[90vh]'>
                <div className=" flex justify-center items-center w-[100%] h-[90vh]">
                    <form onSubmit={handleSubmit} className='w-[90vw] md:w-[30vw]'>
                        <div className="form container md:w-[30vw] w-[100%] md:h-[50vh] h-[40vh] flex flex-col justify-center items-center rounded-3xl">
                            <div className=''>
                                <h1 className='text-white text-2xl'>Are you sure you want to logout?</h1>
                                <div className='mt-[15%] flex justify-between'>
                                    <button onSubmit={handleSubmit} className='px-6 py-2 rounded w-[45%] flex justify-center items-center text-white hover:text-red-200 bg-red-600 hover:bg-red-700 transition ease-out'>Yes, sure</button>
                                    <Link href={'/todo'} onClick={handleCancel} className='px-6 py-2 rounded w-[45%] flex justify-center items-center text-white hover:text-purple-200 bg-gray-500 hover:bg-gray-600 transition ease-out'>Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default withAuth(Logout)
