import { useState } from "react";
import EssayInput from "./EssayInput";
import Summaryresult from "./Summaryresult";
import Secondnav from "../Components/Secondnav";

function Summarypage(){
    const [extractedText, setExtractedText] = useState("");

    return(
        <>
            <Secondnav title="Summarizer"/>
            <div className="flex items-center justify-center min-h-screen bg-bgcolor">
                <div className="bg-gray-300 rounded-2xl grid-cols-2 grid justify-items-center items-center h-120 w-5/6">
                    <EssayInput onTextExtracted={setExtractedText}/>
                    <Summaryresult text={extractedText} />
                </div>
            </div>
        </>
    )
}



export default Summarypage