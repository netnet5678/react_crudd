// import React from 'react'
import clientImglogo1 from '../assets/img/clients/client-01.png'
import clientImglogo2 from '../assets/img/clients/client-02.png'
import clientImglogo3 from '../assets/img/clients/client-03.png'
import clientImglogo4 from '../assets/img/clients/client-04.png'
import clientImglogo5 from '../assets/img/clients/client-05.png'
import clientImglogo6 from '../assets/img/clients/client-06.png'
import clientImglogo7 from '../assets/img/clients/client-07.png'

const clientImg = [
    clientImglogo1,
    clientImglogo2,
    clientImglogo3,
    clientImglogo4,
    clientImglogo5,
    clientImglogo6,
    clientImglogo7
]

function clients() {
    return (
        <div className='container mx-auto max-w-[1320px] py-10 text-center'>
            <h2 className='text-[2.25rem] font-semibold text-[#4D4D4D'>Our Clients</h2>
            <p className='text-[#717171]'>sadasjdasldaijdoad</p>
            <ul className='flex flex-col items-center mg-5 md:flex-row md:justify-between'>
                {clientImg.map((clientImg, index) => (
                    <li key={index} className='inline-block mx-10 my-10'>
                        <img src={clientImg} alt="" />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default clients