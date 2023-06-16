import { Router, useRouter } from 'next/router';
import React, { useEffect, useRef, useState, useReducer } from 'react'

import { IoAdd } from 'react-icons/io5';
import { AiFillCheckCircle, AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';
import withAuth from '../utils/withAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import notify from '../utils/notify'



const TodoSection = () => {

    // console.log(todoList)
    // console.log(Cookies.get("access_token"))
    const [todoList, setTodoList] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const fetchTodoList = async () => {
            try {
                const accessToken = Cookies.get('access_token');
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };
                const response = await fetch(process.env.API_URL + '/api/v1/', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setTodoList(data);
                } else {
                    console.error('Failed to fetch todo list:', response.status);
                }
            } catch (error) {
                console.error('Failed to fetch todo list:', error);
            }
        };

        fetchTodoList();
    }, [ignored]);


    const router = useRouter();

    const handleComplete = async (slug) => {
        try {
            const accessToken = Cookies.get('access_token');

            const response = await fetch(process.env.API_URL + `/api/v1/complete/todo/${slug}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                notify("Hurray🎉You just completed a task.")
                forceUpdate();
            } else {
                notify(`${STATUSCODES[response.status]}, Please try again`, "error")
                console.log("error")
            }
        }
        catch (err) {
            notify("An error occured. Please try again later.", "error")
            console.log("error")
        }

    }

    const handleDelete = async (slug) => {
        try {
            const accessToken = Cookies.get('access_token');

            const response = await fetch(process.env.API_URL + `/api/v1/${slug}/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                notify("Operation successfull")
                forceUpdate();
            } else {
                notify(`${STATUSCODES[response.status]}, Please try again`, "error")
                console.log("error")
            }
        }
        catch (err) {
            notify("An error occured. Please try again later.", "error")
            console.log("error")
        }

    }


    return (
        <>
            {todoList.map((todo) => {
                return <>
                    <div key={todo.slug} className='bg-purple-100 h-14 md:w-[90%] w-[95%] my-3 mx-auto rounded flex items-center' id={todo.slug}>
                        <div className='md:w-[80%] w-[75%] text-purple-900'>
                            <Link href={`/todo/view/${todo.slug}`}>
                                <h1 className='md:text-xl text-sm mx-4'>{todo.title}</h1>
                            </Link>
                        </div>
                        <div className='md:w-[20%] w-[25%] mr-2 flex flex-row text-white'>
                            <button onClick={() => handleComplete(todo.slug)}><AiFillCheckCircle className='text-green-600 md:text-2xl text-xl mx-1 cursor-pointer' title='check' /></button>
                            <Link href={`/todo/item/${todo.slug}`} className='text-yellow-600 md:text-2xl text-xl mx-1 cursor-pointer' ><AiOutlineEdit title='edit' /></Link>
                            <button onClick={() => handleDelete(todo.slug)}><BsTrash className='text-blue-500 md:text-2xl text-xl mx-1 cursor-pointer' title='delete' /></button>
                        </div>
                    </div>

                </>
            })}
        </>
    )
}

const CompleteSection = () => {

    const [complete, setComplete] = useState([]);
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        const fetchTodoList = async () => {
            try {
                const accessToken = Cookies.get('access_token');
                const headers = {
                    Authorization: `Bearer ${accessToken}`,
                };
                const response = await fetch(process.env.API_URL + '/api/v1/complete/todo/', { headers });
                if (response.ok) {
                    const data = await response.json();
                    setComplete(data);
                } else {
                    console.error('Failed to fetch todo list:', response.status);
                }
            } catch (error) {
                console.error('Failed to fetch todo list:', error);
            }
        };

        fetchTodoList();
    }, [ignored]);


    const router = useRouter();

    const handleDelete = async (slug) => {
        try {
            const accessToken = Cookies.get('access_token');

            const response = await fetch(process.env.API_URL + `/api/v1/complete/todo/${slug}/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (response.ok) {
                notify("Operation successfull")
                forceUpdate();
            } else {
                notify(`${STATUSCODES[response.status]}, Please try again`, "error")
                console.log("error")
            }
        }
        catch (err) {
            notify("An error occured. Please try again later.", "error")
            console.log("error")
        }

    }

    return <>
        {complete.map((e) => {
            return (
                <div key={e.slug} className='bg-purple-100 h-14 w-[90%] my-3 mx-auto rounded flex items-center' id={e.slug}>
                    <div className='md:w-[80%] w-[75%] text-purple-900'>
                        <h1 className='md:text-xl text-sm mx-4'>{e.title}</h1>
                    </div>
                    <div className='md:w-[20%] w-[25%] flex flex-row text-white'>
                        <button onClick={() => handleDelete(e.slug)}><BsTrash className='text-blue-500 md:text-2xl text-lg mx-1 cursor-pointer' title='delete' /></button>
                    </div>
                </div>
            )
        })}
    </>
}

const Todo = () => {

    const router = useRouter();

    const handleOnChange = (e) => {
        if (e.target.name == 'task') {

        }


    }

    const handlePlusClick = (e) => {
        router.push('/todo/add')
    }

    const active = (e) => {
        const todo = document.getElementById('todo');
        const complete = document.getElementById('complete');
        const todo_section = document.getElementById('todo_section');
        const complete_section = document.getElementById('complete_section');

        todo.addEventListener('click', () => {
            if (!todo.classList.contains('bg-purple-500') && !todo.classList.contains('text-white')) {
                if (todo.classList.contains('text-purple-950')) {
                    todo.classList.remove('text-purple-950');
                }
                if (todo_section.classList.contains('hidden')) {
                    todo_section.classList.remove('hidden')
                    complete_section.classList.add('hidden')
                }
                todo.classList.add('bg-purple-500');
                todo.classList.add('text-white');
                complete.classList.remove('bg-purple-500');
                complete.classList.remove('text-white');
                complete.classList.add('text-purple-950')
            }
        })

        complete.addEventListener('click', () => {
            if (!complete.classList.contains('bg-purple-500') && !complete.classList.contains('text-white')) {
                if (complete.classList.contains('text-purple-950')) {
                    complete.classList.remove('text-purple-950');
                }
                if (complete_section.classList.contains('hidden')) {
                    complete_section.classList.remove('hidden')
                    todo_section.classList.add('hidden')
                }
                complete.classList.add('bg-purple-500');
                complete.classList.add('text-white');
                todo.classList.remove('bg-purple-500');
                todo.classList.remove('text-white');
                todo.classList.add('text-purple-950')
            }
        })
    }

    return (
        <div>
            <section className='h-[92vh] w-[100vw] flex justify-center items-center flex-col'>
                <div className='md:h-[8vh] md:w-[40vw] w-full flex items-end'>
                    <div onClick={active} className='px-8 py-2 bg-purple-500 rounded-tr text-white cursor-pointer md:text-base text-sm w-1/2 md:w-1/4' id='todo'>To-Do</div>
                    <div onClick={active} className='px-8 py-2 rounded-tr text-purple-950 cursor-pointer md:text-base text-sm w-1/2 md:w-1/4' id='complete'>Completed</div>
                </div>
                <div className="bg-purple-500 h-[92vh] md:h-[70vh] w-[100vw] md:container md:w-[40vw] overflow-y-auto scrollbar scrollbar-track-purple-300 transition-all scrollbar-rounded scrollbar-thumb:bg-purple-600 mx-auto md:rounded-bl overflow-x-hidden shadow-xl scrollbar:scroll-smooth scroll-smooth" id='todo_section'>
                    <TodoSection />

                    <div className='sticky h-14 w-[90%] my-3 mx-auto rounded flex items-center md:hidden'>
                        <button onClick={handlePlusClick} className='text-white w-full bg-purple-600 hover:bg-purple-800 transition-all duration-300 flex justify-center items-center md:hidden mx-auto rounded'><IoAdd className='text-4xl' /></button>

                    </div>
                </div>
                <div className="bg-purple-500 h-[92vh] md:h-[70vh] w-[100vw] md:container md:w-[40vw] overflow-y-auto scrollbar scrollbar-track-purple-300 transition-all scrollbar-rounded scrollbar-thumb:bg-purple-600 mx-auto md:rounded-bl overflow-x-hidden shadow-xl scrollbar:scroll-smooth scroll-smooth hidden" id='complete_section'>
                    <CompleteSection />

                </div>
                <button onClick={handlePlusClick} className='text-white relative h-16 w-16 bg-purple-600 hover:bg-purple-800 transition-all duration-300 -right-[20%] bottom-[5%] md:flex justify-center items-center rounded-full hidden '><IoAdd className='text-4xl' /></button>
            </section>
        </div>
    )
}


export default withAuth(Todo)