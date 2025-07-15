'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'



const page = () => {

  const router = useRouter();
  const [verifystatus, setVerifystatus] = useState<String>('nill')


  const verifyMe = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const SearchParams = new URLSearchParams(window.location.search)
      const token = SearchParams.get("token");

      if (!token) {
        return toast.error('No Token!');
      }

      setVerifystatus('verifying')
      const response = await axios.post(`/api/auth/verifyemail?token=${token}`)

      if (response.data.success) {
        setVerifystatus('Verified')
        toast.success('Verification Successful!');
        return setTimeout(() => {
           router.push('/welcome')
        }, 2000);
      }

    } catch (error: any) {

      console.log(error)
      if(error.response.data.message === 'Invalid or expired verification token!'){
        toast.error('User already verified!')
      }

      if(error.response.data.message === 'Verification token is required!'){
        toast.error('Verification token Timed out!')
      }
    } finally {
      setVerifystatus('nill')
    }
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-300 p-4">

      <Link href={"/"}>
        <Image src="./home.svg" alt="Home" width={40} height={40} className="absolute left-2 top-2 " />
      </Link>

      <div className="bg-white/100 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
        {/* Title & Subtitle */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verification</h2>

          {/* <h1 className='text-2xl text-center '>Verification</h1> */}

          <p className='mt-2 mb-6  text-8a8a93'>Click the below button to verfy your Email Id</p>
          {/* <p className="text-gray-400 mt-2">Join us and explore amazing features!</p> */}





          {/* Submit Button */}



          <button className={`w-full py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md                transition-transform transform  
              flex items-center justify-center gap-4
              ${verifystatus === 'verifying' ? 'animate-pulse' : ''}
                `}
            onClick={verifyMe}
          >{
              verifystatus === 'verifying' ?
                (
                  <>
                    <Image src="./loading.svg" alt="loader" className='animate-spin ' width={25} height={25} />
                  </>
                ) :
                (<>
                  Verify Me
                </>)
            }

          </button>
        </div>


      </div>
    </div>
  )
}

export default page
