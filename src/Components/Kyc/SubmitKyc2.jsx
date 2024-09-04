import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShowKyc from './ShowKyc'

const SubmitKyc2 = () => {
    const[showModal , setShowModal] = useState(false)
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6 text-center">
            <p className="text-2xl font-bold text-blue-800">Bank Account Details</p>
        </div>

        <div className="space-y-6">
            <div>
                <p className='text-lg font-semibold'>Account Details</p>
                <p className='text-sm text-gray-500'>Please enter your Account details carefully this will use for balance settlement.</p>
            </div>
            <div>
                {/* <p className="text-lg font-semibold mb-1">Full Name</p> */}
                <p className="text-gray-600 font-bold text-sm mb-2">Enter your UPI ID*</p>
                <div className="relative">
                    <input
                        type="text"
                        id="full-name"
                        name="full-name"
                        placeholder="John Doe"
                        pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+$"
                        title="Please enter your full name (e.g., John Doe)"
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 hidden valid-name-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg
                        className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500 hidden invalid-name-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <div>
                {/* <p className="text-lg font-semibold mb-1">PAN Card Number</p> */}
                <p className="text-gray-600 font-bold text-sm mb-2">Re-enter UPI ID*</p>
                <div className="relative">
                    <input
                        type="text"
                        id="pan-card-number"
                        name="pan-card-number"
                        placeholder="ABCDE1234F"
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                        title="Please enter a valid PAN card number (e.g., ABCDE1234F)"
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 hidden valid-pan-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg
                        className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500 hidden invalid-pan-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <div>
                {/* <p className="text-lg font-semibold mb-1">Full Name</p> */}
                <p className="text-gray-600 font-bold text-sm mb-2">Enter Bank Name*</p>
                <div className="relative">
                    <input
                        type="text"
                        id="full-name"
                        name="full-name"
                        placeholder="John Doe"
                        pattern="^[a-zA-Z]+(\s[a-zA-Z]+)+$"
                        title="Please enter your full name (e.g., John Doe)"
                        required
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <svg
                        className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 hidden valid-name-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg
                        className="absolute inset-y-0 right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500 hidden invalid-name-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>

            <div className="text-center mt-2">
                <Link to="/"
                onClick={()=>setShowModal(true)}
                    type="button"
                    className="text-white w-full py-2.5 px-6 text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 font-semibold rounded-lg focus:outline-none focus:ring-blue-300"
                >
                    Submit
                </Link>
            </div>
        </div>
        <div className='flex justify-center items-center px-5 m-2 mt-4'>
            <p className='text-sm text-gray-500 text-center'>If you are facing any difficulties, please get in touch with us on <span className='text-blue-800 font-bold'>Whatsapp</span></p>
        </div>
    </div>

    {
        showModal && (
            <div>
        <ShowKyc showModal={() => setShowModal(false)}/>
    </div>
        )
    }

</div>
  )
}

export default SubmitKyc2;