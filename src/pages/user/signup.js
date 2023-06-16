import React, { useState } from 'react'
import { AiFillLock } from 'react-icons/ai';
import Link from 'next/link';
import callApi from '../../utils/callApi';
import { set } from 'date-fns';
import { useRouter } from 'next/router';
import notify from '../../utils/notify'

const Signup = () => {

  const router = useRouter();

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleChange = (e) => {
    if (e.target.name == 'first_name') {
      setFirstName(e.target.value)
    }
    else if (e.target.name == 'last_name') {
      setLastName(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value)
    }
    else if (e.target.name == 'confirm_password') {
      setPassword2(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { first_name, last_name, email, password, password2 }

    try {
      const response = await fetch(process.env.API_URL + "/api/v1/account/register/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        router.push('/user/login');
        notify("Registration successfull🎉 Now you can proceed to login.")
      } else {
        notify(`${STATUSCODES[response.status]}, Please try again`, "error")
        console.log("error")
      }
    }
    catch (err) {
      notify("An error occured. Please try again later.", "error")
      console.log("error")
    }
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
    setPassword2('')
  }


  return (
    <div className='h-[92vh] bg-image-login'>
      <section className='main container  m-auto  h-[90vh]'>
        <div className=" flex justify-center items-center w-[100%] h-[90vh]">
          <form onSubmit={handleSubmit} className='w-[90vw] md:w-[30vw]'>
            <div className="container md:w-[30vw] w-[100%] md:h-[80vh] h-[70vh] flex flex-col justify-center items-center rounded-3xl form">
              <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                <label htmlFor="first_name" className='text-white md:text-base text-xs'>First Name <span className='text-red-600'>*</span></label>
                <input onChange={handleChange} type="text" name='first_name' id='first_name' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' placeholder='John' />
              </div>
              <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                <label htmlFor="last_name" className='text-white md:text-base text-xs'>Last Name <span className='text-red-600'>*</span></label>
                <input onChange={handleChange} type="text" name='last_name' id='last_name' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' placeholder='Doe' />
              </div>
              <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                <label htmlFor="email" className='text-white md:text-base text-xs'>Email <span className='text-red-600'>*</span></label>
                <input onChange={handleChange} type="email" name='email' id='email' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' placeholder='johndoe@gmail.com' />
              </div>
              <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                <label htmlFor="password" className='text-white md:text-base text-xs'>Password <span className='text-red-600'>*</span></label>
                <input onChange={handleChange} type="password" name='password' id='password' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' placeholder='********' />
              </div>
              <div className="flex flex-col w-[80vw] my-1 md:my-2 md:w-[20vw]">
                <label htmlFor="confirm_password" className='text-white md:text-base text-xs'>Confirm Password <span className='text-red-600'>*</span></label>
                <input onChange={handleChange} type="password" name='confirm_password' id='confirm_password' className='border border-gray-500 focus:border-purple-400 focus:outline-purple-400 px-2 py-1 md:px-4 md:py-2 my-2 rounded-full' placeholder='********' />
              </div>

              <div className="flex flex-col w-[80vw] md:my-8 my-4 md:w-[20vw]">
                <button type='submit' className='md:w-[10vw] w-[30vw] bg-purple-500 hover:bg-purple-800 delay-75 duration-200 transition ease-in-out px-2 py-2 rounded-full text-white flex items-center justify-center'>
                  <div className='w-[20%] flex justify-start ml-0 md:ml-2'>
                    <AiFillLock className='relative left-4' />
                  </div>
                  <div className='w-[80%] flex justify-center items-center md:relative md:-left-2 text-sm md:text-base'>
                    Register
                  </div>
                </button>
              </div>
              <div className="flex flex-col w-[80vw] md:w-[20vw]">
                <p className='text-white text-xs md:text-base'>Already have account? <Link href={"/login"} className='text-purple-300 hover:text-purple-500 transition-all'>click here</Link> to login</p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Signup

