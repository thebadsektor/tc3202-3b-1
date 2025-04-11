import React from 'react';
import Navbar from "../Components/Navbar";
import Startbg from "../Images/Startbg.jpg";
import { useNavigate } from 'react-router-dom';
import PlayIcon from '../assets/SidebarIcons/PlayIcon';

function Startpage() {
    const navigate = useNavigate();
    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url(${Startbg})` }}>
            <Navbar name="SmartLearn" page="An AI-Driven Adaptive Learning Platform for Personalized Education" />
            <div className="absolute bottom-31 ml-96 left-2/12 transform -translate-x-1/2 z-10 grid grid-cols-3 gap-4 items-center w-1/2">
                <Startbtn Text="Start" onclick={() => navigate("/mainpage")} />
            </div>
        </div>
    );
}

function Startbtn ({Text, onclick}){
    return (
        <>
            <button
                onClick={onclick}
                className='flex items-center justify-center gap-2 hover:scale-110 transition delay-50 duration-300 ease-in-out text-bgcolor  font-bold  bg-white p-3 h-15 text-3xl rounded-3xl'
                >
                {Text}
            </button>
        </>
    )
}

export default Startpage;
