import { useState } from "react";
import EssayInput from "./EssayInput";
import Resultcol from "./Resultcol";
import Navbar from "../Components/Navbar";
import Secondnav from "../Components/Secondnav";
import BackIcon from "../assets/SidebarIcons/BackIcon";
import { Link } from 'react-router-dom';

function Grammarpage(){
    const [extractedText, setExtractedText] = useState("");

    return(
        <>


            <Secondnav title="Grammar checker"/>    
            

            <div className="flex items-center justify-center min-h-screen bg-bgcolor">
                <div className="bg-gray-300 rounded-2xl grid-cols-2 grid justify-items-center items-center h-120 w-5/6">
                    <EssayInput onTextExtracted={setExtractedText} />
                    <Resultcol text={extractedText} />
                </div>
            </div>
        </>
    )
}

export default Grammarpage