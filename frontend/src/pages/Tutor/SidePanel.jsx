const SidePanel = () => {
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex items-center justify-center'>
            <p className='text_para mt-0 font-bold'>Schedule your appointment</p>
        </div>
        <div className='mt-[30px]'>
            <p className='text_para mt-0 font-semibold text-headingColor'>
                Available Time Slots:
            </p>

            <ul className='mt-3'>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Monday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        10:30 AM - 12:30 PM
                    </p>
                </li>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Wednesday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        10:30 AM - 12:30 PM
                    </p>
                </li>
                <li className='flex items-center justify-between mb-2'>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        Friday
                    </p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        10:30 AM - 3:00 PM
                    </p>
                </li>
            </ul>
        </div>

        <button className='btn px-2 w-full rounded-md'>Book Appointment</button>
    </div>
  )
}

export default SidePanel