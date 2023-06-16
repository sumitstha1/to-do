import { useRouter } from 'next/router'
import React from 'react'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState, useEffect } from "react";
import withAuth from '../../../utils/withAuth';
import Cookies from 'js-cookie';
import axios from 'axios';
import { format } from 'date-fns';
import callApi from '../../../utils/callApi';
import notify from '../../../utils/callApi';

// export async function getStaticPaths() {
//     const response = await axios.get('/api/slug');
//     const { paths } = response.data;

//     return {
//       paths,
//       fallback: true, // or false, depending on your requirements
//     };
//   }

export async function getServerSideProps(context) {

    const { slug } = context.params;

    const accessToken = context.req.cookies.access_token;
    // console.log(accessToken)
    const headers = {
        Authorization: `Bearer ${accessToken}`,
        // Add any other headers you need
    };

    try {
        // Fetch the data from the API using the provided headers
        const response = await fetch(process.env.API_URL + `/api/v1/${slug}/`, { headers });
        const data = await response.json();

        return {
            props: {
                todo: data,
            },
        };
    } catch (error) {
        // Handle any error that occurs during the fetch
        console.error(error);
        return {
            props: {
                todo: {},
            },
        };
    }
}

const Slug = ({ todo }) => {

    // console.log(todo)

    function formatDate(date) {
        return format(date, 'yyyy-MM-dd');
    }


    // console.log(slug)

    const [selectedDate, setSelectedDate] = useState(null);


    // const [todo, setTodo] = useState();
    const [title, setTitle] = useState(todo.title);
    const [description, setDescription] = useState(todo.description);
    const [due_date, setDueDate] = useState(todo.due_date);
    const router = useRouter();
    const { slug } = router.query;

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

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     // Send PUT request to update the value
    //     axios.put(`https://api.example.com/data/${slug}`, { value })
    //         .then(response => {
    //             console.log('Value updated successfully');
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { title, description, due_date }

        try {
            const accessToken = Cookies.get('access_token');
            const response = await fetch(process.env.API_URL + `/api/v1/${slug}/`, {
                method: "PUT",
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
                            <input type="text" id="floating_title" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={title} name='title' onChange={handleChange} />
                            <label htmlFor="floating_title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Title</label>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <div className="relative">
                            <textarea id="floating_desc" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={description} name='description' onChange={handleChange} />
                            <label htmlFor="floating_desc" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <DatePicker selected={selectedDate} onChange={handleDateChange} placeholderText='Select Due Date' className='rounded-lg' value={due_date} name='due_date' dateFormat="yyyy/MM/dd" />
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <button onSubmit={handleSubmit} className='bg-purple-600 md:w-[10vw] py-2 rounded flex justify-center items-center text-white'>Update</button>
                    </div>


                </form>
            </div>
        </section>
    )
}



export default withAuth(Slug)
