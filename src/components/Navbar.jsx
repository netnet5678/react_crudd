import { useState } from 'react'
import Logo from '../assets/img/logo-black.png'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const updateMenu = () => {
        setIsOpen(!isOpen);
    }
  return (
    <nav className='bg-[#F5F7FA]'>
        <div className="container mx-auto max-w-[1320px] relative h-auto p-10 flex flex-col md:flex-row md:justify-between md:h-[80px] md:items-center">
            <div>
                <Link to="/">
                    <img src={ Logo } alt="" />
                </Link>
            </div>

            <ul className= {`${!isOpen ? 'hidden' : 'fexl' }flex flex-col my-5 md:flex md:flex-row`} >
                <li className="my-2 md:mx-4 hover:underline"><Link to="/UserFirstPage">Home</Link></li>
                <li className="my-2 md:mx-4 hover:underline"><Link to="#">Service</Link></li>
                <li className="my-2 md:mx-4 hover:underline"><Link to="#">Feature</Link></li>
                <li className="my-2 md:mx-4 hover:underline"><Link to="#">Product</Link></li>
                <li className="my-2 md:mx-4 hover:underline"><Link to="#">FAQ</Link></li>
            </ul>

            <ul className={`${!isOpen ? 'hidden' : 'fexl' }flex flex-col my-5 md:flex md:flex-row`}>
                <li className="my-2 md:mx-4 hover:underline"><Link className="inline-flex justify-center items-center py-2 px-4 text-[#4CAF4F]" to="/Login">Login</Link></li>
                <li className="my-2 md:mx-4 hover:underline"><Link className="inline-flex justify-center items-center py-2 px-4 bg-[#4CAF4F] text-white rounded-md" to="/Register">Sign Up</Link></li>
            </ul>

            {/* Hamburger */}
            <FaBars onClick={updateMenu} className='absolute right-5 cursor-pointer text-xl md:hidden'/>
        </div>
    </nav>
  )
}

export default Navbar