import { Link } from 'react-router-dom';
import Startpage from "../Pages/Startpage";

function Navbar({page, name}){
    return (
        <div className="fixed top-0 h-14 bg-secondarycolor w-full border-b-1 border-amber-300 flex flex-row items-start justify-between z-20">
            <div className="font-bold text-3xl left-0 mt-2 ml-3">
                <Link to="/" className="flex items-center">
                    <h1>
                        <span className="text-bgcolor ml-0 p-0">{name}</span>
                    </h1>
                    <p className='ml-4 mt-2 text-bgcolor text-xs' >{page}</p>
                </Link>
            </div>
            <div className='h-full flex items-center justify-center pr-5'>
                <ul className="flex gap-4 text-bgcolor text-sm font-medium">
                    <Link to="/about">
                        <li className="hover:underline cursor-pointer">About</li>
                    </Link>
                    <Link to="/contact">
                        <li className="hover:underline cursor-pointer">Contact</li>
                    </Link>
                </ul>
            </div>

        </div>
    );
}


export default Navbar