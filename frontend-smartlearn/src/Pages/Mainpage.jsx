import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import GrammarIcon from '../assets/SidebarIcons/GrammarIcon';
import SummaryIcon from '../assets/SidebarIcons/SummaryIcon';
import QuizIcon from '../assets/SidebarIcons/QuizIcon';

function Mainpage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-bgcolor text-white">
            <Navbar name="SmartLearn" page="An AI-Driven Adaptive Learning Platform for Personalized Education"/>
            <div className="pt-20 px-8 flex flex-col items-center">
                <h1 className="text-6xl font-bold mt-20 mb-4">Welcome to SmartLearn</h1>
                <p className="text-lg mb-6">
                    Choose a learning tool below to begin your journey!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10 h-45 ">
                    <MainButton text="Grammar Checker" Des="Grammar" Icon={<GrammarIcon/>} onClick={() => navigate("/grammar")} />
                    <MainButton text="Summarizer" Des="Summary" Icon={<SummaryIcon/>} onClick={() => navigate("/summary")} />
                    <MainButton text="Topic Quizzes" Des="quizzes" Icon={<QuizIcon/>} onClick={() => navigate("/quizzes")} />
                </div>
            </div>
        </div>
    );
}

function MainButton({ text, onClick, Des, Icon }) {
    return (
        <button
            onClick={onClick}
            className="bg-white text-black font-semibold py-6 px-8 rounded-xl shadow-md hover:scale-105 transition transform duration-300"
        >
            <div className="flex flex-col items-center justify-center"> {/* Added justify-center */}
                <span className="w-24 h-24 mb-2 flex items-center justify-center text-bgcolor"> {/* Increased w and h, and added flex items-center justify-center*/}
                    {Icon}
                </span>
                <span className="mt-2 mb-2 text-lg">{text}</span>
                {Des && <span className="text-sm font-normal text-gray-600 mt-1">{Des}</span>}
            </div>
        </button>
    );
}

export default Mainpage;
