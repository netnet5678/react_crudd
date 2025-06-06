import HeaderImg from '../assets/img/header-img.png'

function Header() {
  return (
    <div className='bg-[#F5F7FA] h-auto md:h-[37.5rem] flex items-center'>
        <div className="contrainer mx-auto max-w-[1320px] p-10 flex flex-col md:flex-row md:justify-between md:h-[37.5rem] md:items-center md:p-0">
            <div>
                <h1 className='text-[4rem] leading-[1] font-semibold text-[#4D4D4D]'>Lessons and insights<br/> <span className='text-[#4CAF4F]'>from 8 year</span></h1>
                <p className='text-[#717171] mt-5'>asfdhsaujdkasdjhsgahfdtgyh</p>
                <a className="inline-flex justify-center items-center py-3 px-8 mt-8 bg-[#4CAF4F] text-white rounded-md" href="#">Register</a>
            </div>
            <div>
                <img src={HeaderImg} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Header