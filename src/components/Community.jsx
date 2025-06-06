// import React from 'react'
import icon01 from '../assets/img/icon-01.png'
import icon02 from '../assets/img/icon-02.png'
import icon03 from '../assets/img/icon-03.png'

function Community() {
  return (
    <div className='container mx-auto max-w-[1320px] text-center'>
        <h2 className='text-[2.25rem] font-semibold text-[#4D4D4D'>Manage your entire community in a single syster</h2>
        <p className='text-[#717171]'>sadasjdasldaijdoad</p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-[100px] m-10 md:m-5'>
            <div className='shadow-lg p-10 rounded-lg'>
                <img className="mx-auto" src={icon01} alt="" />
                <h3 className='text-[1.75rem] font-bold text-[#4D4D4D4D] my-3'>asdasdasaasdsaa<br/>sdddafjui</h3>
                <p>asjdklasdlajshahisaokdl;<br/>ksalijasiufjklaosdijuahy</p>
            </div>
            <div className='shadow-lg p-10 rounded-lg'>
                <img className="mx-auto" src={icon02} alt="" />
                <h3 className='text-[1.75rem] font-bold text-[#4D4D4D4D] my-3'>asdasdasaasdsaa<br/>sdddafjui</h3>
                <p>asjdklasdlajshdgyuas<br/>idosakll;ksalijasiufjklaosdijuahy</p>
            </div>
            <div className='shadow-lg p-10 rounded-lg'>
                <img className="mx-auto" src={icon03} alt="" />
                <h3 className='text-[1.75rem] font-bold text-[#4D4D4D4D] my-3'>asdasdasaasdsaa<br/>sdddafjui</h3>
                <p>asjdklasdlajshdgyuasi<br/>dosakldlijasiufjklaosdijuahy</p>
            </div>
        </div>
    </div>
  )
}

export default Community