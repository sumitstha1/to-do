import React from 'react'
import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import { useState } from "react";
import { IoAdd } from 'react-icons/io5';

const AddTodo = () => {

    const [date, setDate] = useState(null);
    const [focus, setFocus] = useState(false);
    console.log(date, focus);


    return (
        <section className='w-full h-[92vh] flex flex-col justify-center items-center'>
            <div className='w-[40vw] h-[50vh]'>
                <form action="/" className='w-[40vw] flex flex-col justify-center items-center'>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <div className="relative">
                            <input type="text" id="floating_title" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_title" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Title</label>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <div className="relative">
                            <textarea id="floating_desc" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-gray-900 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="floating_desc" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Description</label>
                        </div>
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <SingleDatePicker
                            date={date} // momentPropTypes.momentObj or null
                            onDateChange={(date) => setDate(date)} // PropTypes.func.isRequired
                            focused={focus} // PropTypes.bool
                            onFocusChange={({ focused }) => setFocus(focused)} // PropTypes.func.isRequired
                            numberOfMonths={1}
                            displayFormat="DD-MMM-YYYY"
                            showClearDate={true}
                            isOutsideRange={() => false}
                        />
                    </div>
                    <div className='flex flex-col md:w-[35vw] w-[85vw] my-2'>
                        <button className='bg-purple-600 md:w-[10vw] py-2 rounded flex justify-center items-center text-white'>Add</button>
                    </div>


                </form>
            </div>
        </section>
    )
}

export default AddTodo
