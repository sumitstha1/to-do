import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { IoAdd } from 'react-icons/io5';
import withAuth from '../../utils/withAuth'
import { format } from 'date-fns';
import callApi from '../../utils/callApi';
import notify from '../../utils/notify';
import { STATUSCODES } from '../../../datas/statusCodes';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const AddTodo = () => {

    const router = useRouter();

    const [selectedDate, setSelectedDate] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDueDate] = useState('');

    function formatDate(date) {
        return format(date, 'yyyy-MM-dd');
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setDueDate(formatDate(date))
    };

    const handleChange = (e) => {
        if (e.target.name == 'title') {
            setTitle(e.target.value)
        }
        else if (e.target.name == 'description') {
            setDescription(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { title, description, due_date }


        try {
            const accessToken = Cookies.get('access_token');
            const response = await fetch(process.env.API_URL + "/api/v1/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify(data)
            });
            console.log(JSON.stringify(data))
            if (response.ok) {
                notify("Todo added successfully")
                router.push("/todo")
            } else {
                notify(`${STATUSCODES[response.status]}, Please try again`, "error")
                console.log("error")
            }
        }
        catch (err) {
            notify("An error occured. Please try again later.", "error")
            console.log(err)
        }
    }


    return (
        <section className='w-full h-[92vh] flex flex-col justify-center items-center'>
            <div className='w-[40vw] h-[50vh]'>
                <form onSubmit={handleSubmit} className='w-[40vw] flex flex-col justify-center items-center'>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <div className="relative">
                            <input type="text" id="floating_title" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer caret-purple-500" placeholder=" " name='title' onChange={handleChange} required />
                            <label htmlFor="floating_title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Title</label>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <div className="relative">
                            <textarea id="floating_desc" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer caret-purple-500" placeholder=" " name='description' onChange={handleChange} />
                            <label htmlFor="floating_desc" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="yyyy/MM/dd" placeholderText='Select Due Date' className='rounded-lg' name='due_date' />
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <button className='bg-purple-600 md:w-[10vw] py-2 rounded flex justify-center items-center text-white'>Add</button>
                    </div>


                </form>
            </div>
        </section>
    )
}

export default withAuth(AddTodo)
