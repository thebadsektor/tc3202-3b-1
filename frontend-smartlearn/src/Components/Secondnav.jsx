import React from 'react';
import { Link } from 'react-router-dom';
import BackIcon from "../assets/SidebarIcons/BackIcon";

function Secondnav({ title }) {
    return (
        <div className="fixed top-0 h-14 pl-3 bg-secondarycolor w-full border-b border-amber-300 flex flex-col justify-center">
            <div className="flex flex-row justify-between items-center px-4">
                <Link to='/mainpage'>
                    <BackIcon />
                </Link>

                <div className="font-bold text-3xl">
                    <h1 className="text-bgcolor ml-0 p-0">
                        {title}
                    </h1>
                </div>

                {/* Optional spacer to maintain spacing */}
                <div style={{ width: "24px" }} />
            </div>
        </div>
    );
}

export default Secondnav;
