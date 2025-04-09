import { useState } from "react";
import EssayInput from "./EssayInput";
import Resultcol from "./Resultcol";
import Navbar from "../Components/Navbar";

function Grammarpage(){
    const [extractedText, setExtractedText] = useState("");

    return(
        <>
            <Navbar name="Grammar checker"/>
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