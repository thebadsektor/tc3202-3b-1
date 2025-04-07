import Navbar from "../Components/Navbar"
import { useNavigate } from "react-router-dom";
import PenIcon from "../assets/SidebarIcons/PenIcon"


function Mainpage(){
    const navigate = useNavigate();

    return(
    <>
        <Navbar/>
        <div className="bg-gray-200 h-100 w-full flex flex-col items-center justify-center mt-14">
            <div className="w-90 h-40 rounded-2xl justify-center flex items-center flex-col bg-blue-300">
                <h2 className="text-center m-5 text-md">An AI-Driven Adaptive Learning Platform for
                Personalized Education</h2>
                <button className="border-1 rounded h-8 min-w-24 ">
                    Learn more
                </button>
            </div>
        </div>
        <div className="bg-blue-300 w-full h-50 grid-cols-2 grid place-items-center">
            <Cardbox icon={<PenIcon/>} cardname="Grammar checker" carddes="Fix your essay" onClick={() => navigate("/grammar")}/>
            <Cardbox icon={<PenIcon/>} cardname="Summarizer" carddes="Summarize text" onClick={() => navigate("/summary")}/>
        </div>
        <div className="bottom-0 h-40 w-full">
        <h1>heeloworld</h1>
        </div>
    </>
    )
}

function Cardbox ({cardname, carddes, icon, onClick}){
    return(
        <button
            onClick={onClick}
            className="w-1/2 h-1/2 bg-white rounded-3xl shadow-md items-center flex justify-start p-0 hover:bg-gray-300 hover:border-1 transition delay-150 duration-150 ease-in-out hover:-translate-y-1 hover:scale-110 "
            >
            <div
                id="Logo"
                className="mr-2 ml-2 flex flex-col w-15 h-full rounded-md justify-center items-center"
            >
                <span className="flex-shrink-0 w-6 h-6">{icon}</span>
            </div>
            <div className="h-full w-full flex-col flex justify-center">
                <h1 className="w-full text-2xl mb-1">{cardname}</h1>
                <p className="text-sm text-gray">{carddes}</p>
            </div>
        </button>
    )
}

function Learnmore(){
    return(
        <>
            <div>
                
            </div>
        </>
    )
}
export default Mainpage