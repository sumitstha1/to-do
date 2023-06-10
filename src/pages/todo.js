import { Router, useRouter } from 'next/router';
import React, { useRef, useState } from 'react'

import { IoAdd } from 'react-icons/io5';
import { AiFillCheckCircle, AiOutlineEdit } from 'react-icons/ai';
import { BsTrash } from 'react-icons/bs';

const TodoSection = () => {

    const todoList = [
        {
            title: "This is a demo to do 1",
            slug: "this-is-1",
            description: "This is for the demo purpose only",
            isChecked: false
        },
        {
            title: 'This is a demo to do 2',
            slug: 'this-is-2',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 3',
            slug: 'this-is-3',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 4',
            slug: 'this-is-4',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 5',
            slug: 'this-is-5',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 6',
            slug: 'this-is-6',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 7',
            slug: 'this-is-7',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 8',
            slug: 'this-is-8',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 9',
            slug: 'this-is-9',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 10',
            slug: 'this-is-10',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 11',
            slug: 'this-is-11',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 12',
            slug: 'this-is-12',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 13',
            slug: 'this-is-13',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 14',
            slug: 'this-is-14',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
    ];

    const handleCheckboxChange = (slug) => {
        const updatedTodoList = todoList.map((todo) => {
            if (todo.slug === slug) {
                return {
                    ...todo,
                    isChecked: !todo.isChecked
                };
            }
            return todo;
        });

        // Log the updatedTodoList to see the changes
        console.log(updatedTodoList);
    };



    return (
        <>
            {todoList.map((todo) => {
                return (
                    <div key={todo.slug} className='bg-purple-400 h-14 w-[90%] my-3 mx-auto rounded flex items-center' id={todo.slug}>
                        <div className='w-[80%] text-purple-900'>
                            <h1 className='text-xl mx-4'>{todo.title}</h1>
                        </div>
                        <div className='w-[20%] flex flex-row text-white'>
                            <AiFillCheckCircle className='text-green-600 text-2xl mx-1 cursor-pointer' title='check' />
                            <AiOutlineEdit className='text-yellow-600 text-2xl mx-1 cursor-pointer' title='edit' />
                            <BsTrash className='text-blue-500 text-2xl mx-1 cursor-pointer' title='delete' />
                        </div>
                    </div>

                )
            })}
        </>
    )
}

const CompleteSection = () => {
    const complete = [
        {
            title: "This is a demo to do 100",
            slug: "this-is-100",
            description: "This is for the demo purpose only",
            isChecked: false
        },
        {
            title: 'This is a demo to do 200',
            slug: 'this-is-200',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
        {
            title: 'This is a demo to do 300',
            slug: 'this-is-300',
            description: 'This is for the demo purpose only',
            isChecked: false
        },
    ];

    return <>
        {complete.map((e) => {
            return (
                <div key={e.slug} className='bg-purple-400 h-14 w-[90%] my-3 mx-auto rounded flex items-center' id={e.slug}>
                    <div className='w-[80%] text-purple-900'>
                        <h1 className='text-xl mx-4'>{e.title}</h1>
                    </div>
                    <div className='w-[20%] flex flex-row text-white'>
                        <AiFillCheckCircle className='text-green-600 text-2xl mx-1 cursor-pointer' title='check' />
                        <AiOutlineEdit className='text-yellow-600 text-2xl mx-1 cursor-pointer' title='edit' />
                        <BsTrash className='text-blue-500 text-2xl mx-1 cursor-pointer' title='delete' />
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
            if (!todo.classList.contains('bg-purple-200') && !todo.classList.contains('text-white')) {
                if (todo.classList.contains('text-purple-950')) {
                    todo.classList.remove('text-purple-950');
                }
                if (todo_section.classList.contains('hidden')) {
                    todo_section.classList.remove('hidden')
                    complete_section.classList.add('hidden')
                }
                todo.classList.add('bg-purple-200');
                todo.classList.add('text-white');
                complete.classList.remove('bg-purple-200');
                complete.classList.remove('text-white');
                complete.classList.add('text-purple-950')
            }
        })

        complete.addEventListener('click', () => {
            if (!complete.classList.contains('bg-purple-200') && !complete.classList.contains('text-white')) {
                if (complete.classList.contains('text-purple-950')) {
                    complete.classList.remove('text-purple-950');
                }
                if (complete_section.classList.contains('hidden')) {
                    complete_section.classList.remove('hidden')
                    todo_section.classList.add('hidden')
                }
                complete.classList.add('bg-purple-200');
                complete.classList.add('text-white');
                todo.classList.remove('bg-purple-200');
                todo.classList.remove('text-white');
                todo.classList.add('text-purple-950')
            }
        })
    }

    return (
        <div>
            <section className='h-[92vh] w-[100vw] flex justify-center items-center flex-col'>
                <div className='md:h-[8vh] md:w-[40vw] w-full flex items-end'>
                    <div onClick={active} className='px-8 py-2 bg-purple-200 rounded-tr text-white cursor-pointer md:text-base text-sm w-1/2 md:w-1/4' id='todo'>To-Do</div>
                    <div onClick={active} className='px-8 py-2 rounded-tr text-purple-950 cursor-pointer md:text-base text-sm w-1/2 md:w-1/4' id='complete'>Completed</div>
                </div>
                <div className="bg-purple-200 h-[92vh] md:h-[70vh] w-[100vw] md:container md:w-[40vw] overflow-y-auto scrollbar scrollbar-track-purple-300 transition-all scrollbar-rounded scrollbar-thumb:bg-purple-600 mx-auto md:rounded-bl overflow-x-hidden shadow-xl scrollbar:scroll-smooth scroll-smooth" id='todo_section'>
                    <TodoSection />

                    <div className='sticky h-14 w-[90%] my-3 mx-auto rounded flex items-center md:hidden'>
                        <button onClick={handlePlusClick} className='text-white w-full bg-purple-500 hover:bg-purple-700 transition-all duration-300 flex justify-center items-center md:hidden mx-auto rounded'><IoAdd className='text-4xl' /></button>

                    </div>
                </div>
                <div className="bg-purple-200 h-[92vh] md:h-[70vh] w-[100vw] md:container md:w-[40vw] overflow-y-auto scrollbar scrollbar-track-purple-300 transition-all scrollbar-rounded scrollbar-thumb:bg-purple-600 mx-auto md:rounded-bl overflow-x-hidden shadow-xl scrollbar:scroll-smooth scroll-smooth hidden" id='complete_section'>
                    <CompleteSection />

                </div>
                <button onClick={handlePlusClick} className='text-white relative h-16 w-16 bg-purple-500 hover:bg-purple-700 transition-all duration-300 -right-[20%] bottom-[5%] md:flex justify-center items-center rounded-full hidden '><IoAdd className='text-4xl' /></button>
            </section>
        </div>
    )
}

export default Todo