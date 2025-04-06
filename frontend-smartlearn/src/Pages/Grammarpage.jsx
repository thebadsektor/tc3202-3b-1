import { useState } from "react";
import EssayInput from "./EssayInput";

function Grammarpage(){
    const [text, setText] = useState("");

    return(
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-gray-300 rounded-2xl grid-cols-2 grid justify-items-center items-center h-120 w-5/6">
                    <EssayInput/>
                    <div className="w-full h-full">
                        <textarea
                        className="w-full p-4 h-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Start by writing, pasting (Ctrl + V) text, or uploading a document (doc, pdf)."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}



export default Grammarpage