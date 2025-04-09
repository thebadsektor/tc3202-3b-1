import { Link } from 'react-router-dom';

function Navbar({page, name}){
    return (
        <div className="fixed top-0 h-14 bg-secondarycolor w-full border-b-1 border-amber-300 flex flex-col items-start">
            <div className="font-bold text-3xl left-0 mt-2 ml-3 bold">
                <Link to="/" className="flex items-center">
                    <h1>
                        <span className="text-bgcolor ml-0 p-0">{name}</span>
                    </h1>
                    <p className='ml-4 mt-2 text-bgcolor text-xs' >{page}</p>
                </Link>
            </div>
        </div>
    );
}


export default Navbar