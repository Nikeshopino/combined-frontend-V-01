import { IoMdClose } from "react-icons/io";

const ShowKyc = (showModal) => {
    return (
        <div className='fixed flex justify-center items-end top-0 bottom-0 left-0 right-0 w-full h-full z-1000 bg-gray-800 bg-opacity-70'>

            <div className=' p-4 flex justify-center items-center w-2/5'>
                <div className='bg-white rounded-xl p-2'>
                    <div className='m-2'>
                        <button className='block ml-auto' onClick={showModal}>
                            <IoMdClose />
                        </button>
                    </div>
                    <p className='text-md font-bold text-center'>How much time we take to verify your KYC ?</p>
                    <p className='text-center px-3'>Your Kyc and Client ID are important details for your account. They
                        can be easily found in the profile section of your broking account or in your E-CAS statement sent
                        to your email.
                    </p>
                    <p className='text-center px-3'>If your Demat account is with CDSL, both the DP ID and Client ID will be 8 digit
                        each. For example, if your Demat number is 51651651564, then your DP ID is 6516516514
                        and your Client ID is 6541656546846
                    </p>
                    <p className='text-center px-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, architecto. Odio,
                        alias voluptatem nisi cupiditate iste soluta similique error consequuntur?</p>
                </div>
            </div>
        </div>
    )
}

export default ShowKyc;