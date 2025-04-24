import Navbar from "../Components/Navbar";
import Secondnav from "../Components/Secondnav";

function QuizTopic() {
    return (
        <div className="min-h-screen bg-bgcolor flex"> {/* Added flex flex-col */}
            <Secondnav title="Quiz topic"/>
            <div className="items-center justify-center flex">
                <h1 className="px-8 font-bold text-7xl text-white">
                    Coming soon
                </h1>
            </div>
        </div>
    );
}

export default QuizTopic;