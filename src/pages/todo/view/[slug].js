import { useRouter } from 'next/router';
import React from 'react'
import { IoIosArrowBack } from 'react-icons/io';


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
    const router = useRouter();
    // if (todo == {}){
    //     return (
    //         <div>
    //             <section className='h-[92vh] w-[100vw] flex justify-center items-center flex-col'>
    //                 <div className="bg-purple-500 h-[92vh] md:h-[70vh] w-[100vw] md:container md:w-[40vw] overflow-y-auto scrollbar scrollbar-track-purple-300 transition-all scrollbar-rounded scrollbar-thumb:bg-purple-600 mx-auto md:rounded-bl overflow-x-hidden shadow-xl scrollbar:scroll-smooth scroll-smooth" id='todo_section'>

    //                 <IoIosArrowBack className='relative top-5 left-4 text-purple-50 text-lg cursor-pointer hover:text-purple-200 hover:top-4 transition-all ease-linear delay-100' title='go back'/>

    //                     404 Not Found
    //                 </div>
    //             </section>
    //         </div>
    //     )
    // }
    // else {
    return (
        <div>
            <section className='h-[92vh] w-[100vw] flex justify-center items-center flex-col'>
                <div className="bg-purple-500 h-[92vh] md:h-[70vh] w-[100vw] md:container md:w-[40vw] overflow-y-auto scrollbar scrollbar-track-purple-300 transition-all scrollbar-rounded scrollbar-thumb:bg-purple-600 mx-auto md:rounded-bl overflow-x-hidden shadow-xl scrollbar:scroll-smooth scroll-smooth" id='todo_section'>

                    <IoIosArrowBack onClick={() => router.push('/todo')} className='relative top-5 left-4 md:top-10 md:left-4 text-purple-50 text-lg cursor-pointer hover:text-purple-200 md:hover:top-9 transition-all ease-linear delay-100' title='go back' />

                    <section className='uppersection h-[15%] flex justify-center items-center'>
                        <h1 className='text-purple-200 text-3xl '>{todo.title}</h1>
                    </section>
                    <section className='lowersection h-[85%] flex justify-center'>
                        <div className='w-[95%]'>
                            <p className='text-purple-100 text-lg mx-2 my-1'>{todo.description}</p>
                            <p className=' text-purple-100 text-base mx-2 font-mono my-10'>You have claimed to complete this task by <span className='text-purple-300'>{todo.due_date}</span></p>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    )
}
// }

export default Slug
