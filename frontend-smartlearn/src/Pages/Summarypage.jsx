import { useState, useEffect } from "react";
import SummaryInput from "./SummaryInput";
import Summaryresult from "./Summaryresult";
import Secondnav from "../Components/Secondnav";

function Summarypage() {
    const [extractedText, setExtractedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [wordCount, setWordCount] = useState(0);
    const [summaryResult, setSummaryResult] = useState("");
    const [isError, setIsError] = useState(false);
    const wordLimit = 1000;
    
    // Get the API key from environment variables
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    // For debugging - check if summaryResult is being updated
    useEffect(() => {
        console.log("Summary Result:", summaryResult);
    }, [summaryResult]);

    const handleTextChange = (text) => {
        setExtractedText(text);
        setWordCount(text.trim().split(/\s+/).filter(Boolean).length);
    };

    const handleAnalyze = async () => {
        if (!extractedText.trim()) {
            alert("Please enter or upload text to summarize.");
            return;
        }

        setIsLoading(true);
        setIsError(false);
        setSummaryResult(""); // Clear previous results
        
        try {
            // Check if API key exists
            if (!API_KEY) {
                throw new Error("API key is missing. Please check your environment variables.");
            }
            
            // Using the Gemini 2.0 Flash model
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
            
            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `Please provide a concise summary of the following text:\n\n${extractedText}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: 0.4,
                    maxOutputTokens: 800
                }
            };
            
            console.log("Sending request to Gemini API...");
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
            }
            
            const data = await response.json();
            console.log("API Response:", data);
            
            // Check the structure of the response and extract text
            if (data.candidates && data.candidates[0]?.content?.parts && data.candidates[0].content.parts.length > 0) {
                const summary = data.candidates[0].content.parts[0].text;
                console.log("Extracted summary:", summary);
                setSummaryResult(summary);
            } else {
                console.error("Unexpected API response structure:", data);
                throw new Error("Failed to extract summary from API response");
            }
        } catch (error) {
            console.error("Error summarizing text:", error);
            setIsError(true);
            setSummaryResult("An error occurred while generating the summary. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Secondnav title="Summarizer"/>
            <div className="flex items-center justify-center min-h-screen bg-bgcolor">
                <div className="bg-gray-300 rounded-2xl grid-cols-2 grid justify-items-center items-center h-120 w-5/6">
                    <SummaryInput 
                        text={extractedText}
                        onTextChange={handleTextChange}
                        onAnalyze={handleAnalyze}
                        isLoading={isLoading}
                        wordCount={wordCount}
                        wordLimit={wordLimit}
                    />
                    <Summaryresult 
                        text={summaryResult} 
                        placedes="Upload a document and click 'Summarize' to see results..." 
                        isError={isError}
                    />
                </div>
            </div>
        </>
    );
}

export default Summarypage;