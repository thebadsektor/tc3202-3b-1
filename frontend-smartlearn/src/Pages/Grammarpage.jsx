import { useState } from "react";
import EssayInput from "./EssayInput";
import Resultcol from "./Resultcol";
import Navbar from "../Components/Navbar";

function Grammarpage(){
    const [extractedText, setExtractedText] = useState("");

    return(
        <>
            <div className="fixed top-0 h-14 bg-white w-full border-b-1 border-gray-300 flex flex-col items-start" >
                <div className="bold text-3xl left-0 mt-2 ml-3 bold">  
                    <h1><span className="mr-0 p-0"> Grammar</span><span className="text-blue-400 ml-0 p-0"> Checker</span></h1>
                </div>
            </div>
            <div className="flex mt-5 items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-gray-300 rounded-2xl grid-cols-2 grid justify-items-center items-center h-120 w-5/6">
                    <EssayInput onTextExtracted={setExtractedText} />
                    <Resultcol text={extractedText} />
                </div>
            </div>
        </>
    )
}

export default Grammarpage