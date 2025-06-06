// import React from 'react'
import img01 from '../assets/img/img-01.png'

function Pixel() {
  return (
    <div className='py-10'>
        <div className='container mx-auto max-w-[1320px] p-10 grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div>
                <img src={img01} alt="" />
            </div>
            <div>
                <h3 className='mt-5 md:mt-0 text-[2.25rem] font-semibold text-[#4D4D4D]'>sajdsaidjosaidjgw992<br/>38023io0i12931209</h3>
                <p className='text=[#717171] my-5'>
                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a className="inline-flex justify-center items-center py-3 px-8 mt-5 bg-[#4CAF4F] text-white rounded-md" href="#">Lean More</a>
            </div>
        </div>

    </div>
  )
}

export default Pixel