import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { BsArrowRight } from 'react-icons/bs';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container w-[90%] flex justify-center mx-auto my-8 md:flex-row flex-col md:h-full">
        <div className="img border border-black md:w-1/2 w-full">
          <Image height={400} width={400} src={"/front_d.jpg"} alt='front' className='w-[80vw]' />
        </div>
        <div className="content md:mx-10 md:w-1/2 w-full md:flex md:flex-col">
          <div className='h-1/2 flex flex-col justify-center'>
            <h1 className='md:text-4xl text-2xl text-center md:text-left'>
              Let us remind you what to-do
            </h1>
            <p className='md:text-base text-sm text-center md:text-left'>
              We have a lot of work to do day by day and sometimes we cant remember what we had planned to do. so here is To-Do Brand for your service. To-Do Brand provides you a space for writing down the activities and tasks you had planned to do.
            </p>
          </div>
          <div className='h-1/2 flex md:items-center md:justify-start justify-center md:my-0 my-4'>
            <Link href={"/todo"} className='inline-flex text-white bg-purple-500 border-0 md:py-2 md:px-6 py-1 px-2 focus:outline-none hover:bg-purple-600 rounded-full md:text-lg text-sm mx-4 my-4 h-10 w-40 justify-between items-center'>
              Get started
              <span>
                <BsArrowRight />
              </span>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
