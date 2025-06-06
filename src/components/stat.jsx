// import React from 'react'
import icon04 from '../assets/img/icon-04.png'
import icon05 from '../assets/img/icon-05.png'
import icon06 from '../assets/img/icon-06.png'
import icon07 from '../assets/img/icon-07.png'

function Stat() {
    return (
        <div className='bg-[#F5F7FA] py-10 px-5 md:px-0'>
            <div className='container mx-auto max-w-[1320px] grid grid-cols-1 md:grid-cols-2'>
                <div className=''>
                    <h3 className='text-[2.25rem] font-semibold pl-10'>12909ew21i0kdoakdjaisj<br /><span className='text-[#4CAF4F]'>d092el1-0i293p12koj3io</span></h3>
                    <p className='pl-10'>ekdasdmklcmlzczxc,z.,xzc.z,mz,vmcnv</p>
                </div>
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 text-center mt:text-left'>
                        <div className='flex flex-col md:flex-row items-center'>
                            <img className='m-5'src={icon04} alt="" />
                            <div>
                                <h4 className='text-[1.75rem] text-[#4D4D4D] font-bolt'>2,245,341</h4>
                                <p>Member</p>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row items-center'>
                            <img className='m-5' src={icon05} alt="" />
                            <div>
                                <h4 className='text-[1.75rem] text-[#4D4D4D] font-bolt'>46,328</h4>
                                <p>Clubs</p>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row items-center'>
                            <img className='m-5' src={icon06} alt="" />
                            <div>
                                <h4 className='text-[1.75rem] text-[#4D4D4D] font-bolt'>828,867</h4>
                                <p>Event bookings</p>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row items-center'>
                            <img className='m-5' src={icon07} alt="" />
                            <div>
                                <h4 className='text-[1.75rem] text-[#4D4D4D] font-bolt'>1,926,436</h4>
                                <p>Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stat