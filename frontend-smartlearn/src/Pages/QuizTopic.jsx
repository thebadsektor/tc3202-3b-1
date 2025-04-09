import Navbar from "../Components/Navbar";

function QuizTopic() {
    return (
        <div className="min-h-screen bg-bgcolor text-white flex flex-col"> {/* Added flex flex-col */}
            <Navbar />
            <div className="flex flex-grow items-center justify-center"> {/* Added flex-grow, items-center, justify-center */}
                <h1 className="px-8 font-bold text-7xl"> {/* Adjusted font size for better visibility */}
                    Coming soon
                </h1>
            </div>
            {/* You can remove the empty h1 if it's not needed */}
        </div>
    );
}

export default QuizTopic;