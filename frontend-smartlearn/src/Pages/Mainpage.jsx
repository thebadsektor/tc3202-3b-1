import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import GrammarIcon from '../assets/SidebarIcons/GrammarIcon';
import SummaryIcon from '../assets/SidebarIcons/SummaryIcon';
import QuizIcon from '../assets/SidebarIcons/QuizIcon';

function Mainpage() {
    const navigate = useNavigate();

    // Navigation handlers
    const navigateToGrammar = () => navigate("/grammar");
    const navigateToSummary = () => navigate("/summary");
    const navigateToQuizzes = () => navigate("/quizzes");

    return (
        <div className="min-h-screen bg-bgcolor text-white">
            <Navbar name="SmartLearn" page="An AI-Driven Adaptive Learning Platform for Personalized Education"/>
            <div className="pt-20 px-8 flex flex-col items-center">
                <h1 className="text-6xl font-bold mt-20 mb-4">Welcome to SmartLearn</h1>
                <p className="text-lg mb-6">
                    Choose a learning tool below to begin your journey!
                </p>
                <motion.section 
                  variants={{ 
                    hidden: { opacity: 0 }, 
                    show: { 
                      opacity: 1, 
                      transition: { 
                        staggerChildren: 0.25, 
                      }, 
                    }, 
                  }} 
                  initial="hidden" 
                  animate="show"
                  className="w-full max-w-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                    <motion.div 
                      variants={{ 
                        hidden: { opacity: 0, scale: 0.8 }, 
                        show: { opacity: 1, scale: 1, transition: { duration: 0.5 } } 
                      }}
                      className="h-full"
                    >
                      <MainButton 
                        text="Grammar Checker" 
                        Des="Grammar" 
                        Icon={<GrammarIcon />} 
                        onClick={navigateToGrammar}
                      />
                    </motion.div>
                    
                    <motion.div 
                      variants={{ 
                        hidden: { opacity: 0, scale: 0.8 }, 
                        show: { opacity: 1, scale: 1, transition: { duration: 0.5 } } 
                      }}
                      className="h-full"
                    >
                      <MainButton 
                        text="Summarizer" 
                        Des="Summary" 
                        Icon={<SummaryIcon />} 
                        onClick={navigateToSummary}
                      />
                    </motion.div>
                    
                    <motion.div 
                      variants={{ 
                        hidden: { opacity: 0, scale: 0.8 }, 
                        show: { opacity: 1, scale: 1, transition: { duration: 0.5 } } 
                      }}
                      className="h-full"
                    >
                      <MainButton 
                        text="Topic Quizzes" 
                        Des="quizzes" 
                        Icon={<QuizIcon />} 
                        onClick={navigateToQuizzes}
                      />
                    </motion.div>
                  </div>
                </motion.section>
            </div>
        </div>
    );
}

function MainButton({ text, onClick, Des, Icon }) {
    return (
        <button
            onClick={onClick}
            className="bg-white text-black font-semibold py-6 px-8 rounded-xl shadow-md hover:scale-105 transition transform duration-300 w-full h-full"
        >
            <div className="flex flex-col items-center justify-center">
                <span className="w-24 h-24 mb-2 flex items-center justify-center text-bgcolor">
                    {Icon}
                </span>
                <span className="mt-2 mb-2 text-lg">{text}</span>
                {Des && <span className="text-sm font-normal text-gray-600 mt-1">{Des}</span>}
            </div>
        </button>
    );
}

export default Mainpage;