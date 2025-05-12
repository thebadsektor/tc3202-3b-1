import React, { useState, useEffect } from 'react';
import Navbar from "../Components/Navbar";
import Startbg from "../Images/picturelogo.jpg";
import { useNavigate } from 'react-router-dom';

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  onAuthStateChanged,
  signOut 
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyqDV44N0GIs0xnE-yNzbGPgIJK7HX7bI",
  authDomain: "smartlearn-6b409.firebaseapp.com",
  projectId: "smartlearn-6b409",
  storageBucket: "smartlearn-6b409.firebasestorage.app",
  messagingSenderId: "454913779888",
  appId: "1:454913779888:web:529c3340c78903dbfc3375"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function Startpage() {
    const navigate = useNavigate();
    const [showCard, setShowCard] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    
    // Check if user is already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                // If user is logged in, redirect to main page
                navigate("/Mainpage");
            }
        });
        
        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setError("Failed to log out");
            console.error("Logout error:", error);
        }
    };
    
    return (
        <div className="relative w-full h-screen bg-bgcolor">
            <Navbar name="SmartLearn" page="An AI-Driven Adaptive Learning Platform for Personalized Education" />

            {/* Logo at bottom right */}
            <img src={Startbg} alt="Logo" className='absolute bottom-0 right-0 w-220 h-110 mb-8 mr-8 z-0' />

            {/* Text and button in column */}
            <div className="flex flex-col items-start justify-center h-full pl-10 z-10 relative">
                <h1 className='font-bold text-7xl text-white mb-8'>
                    Start your <br /> study companion
                </h1>
                {user ? (
                    <div className="flex flex-col gap-4">
                        <p className="text-white text-xl">Welcome, {user.email}</p>
                        <div className="flex gap-4">
                            <Startbtn Text="Go to Dashboard" onclick={() => navigate("/Mainpage")} />
                            <Startbtn Text="Logout" onclick={handleLogout} />
                        </div>
                    </div>
                ) : (
                    <Startbtn Text="Login" onclick={() => setShowCard(true)} />
                )}
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
            
            <Card show={showCard} onClose={() => setShowCard(false)} setError={setError} />
        </div>
    );
}

function Startbtn({ Text, onclick }) {
    return (
        <button
            onClick={onclick}
            className='ml-5 hover:scale-110 transition delay-50 duration-300 ease-in-out text-bgcolor font-bold bg-white px-6 py-3 text-3xl rounded-2xl'
        >
            {Text}  
        </button>
    )
}


function Card({ show, onClose, setError }) {
    const navigate = useNavigate();
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState('');

    if (!show) return null;

    const isEmailError = email.trim() === '';
    const isUsernameError = username.trim() === '';
    const isPasswordError = password.trim() === '';
    const isConfirmPasswordError = isRegister && confirmPassword.trim() === '';
    const passwordsDontMatch = isRegister && password !== confirmPassword;

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);
        
        // Form validation
        if (isEmailError || isUsernameError || isPasswordError || isConfirmPasswordError) {
            setFormError('Please fill in all required fields');
            setLoading(false);
            return;
        }
        
        if (passwordsDontMatch) {
            setFormError('Passwords do not match');
            setLoading(false);
            return;
        }
        
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Store additional user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                username: username,
                email: email,
                createdAt: new Date().toISOString()
            });
            
            // Close the modal and redirect to main page
            onClose();
            navigate("/Mainpage");
        } catch (error) {
            console.error("Registration error:", error);
            if (error.code === 'auth/email-already-in-use') {
                setFormError('Email is already in use');
            } else if (error.code === 'auth/weak-password') {
                setFormError('Password is too weak (minimum 6 characters)');
            } else {
                setFormError('Failed to register. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);
        
        // Form validation
        if (isEmailError || isPasswordError) {
            setFormError('Please fill in all required fields');
            setLoading(false);
            return;
        }
        
        try {
            // Sign in user with email and password
            await signInWithEmailAndPassword(auth, email, password);
            
            // Close the modal and redirect to main page
            onClose();
            navigate("/Mainpage");
        } catch (error) {
            console.error("Login error:", error);
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setFormError('Invalid email or password');
            } else {
                setFormError('Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-6 fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-opacity-10 z-10">
            <div className="bg-white w-1/2 p-10 rounded-2xl relative flex flex-col items-center pointer-events-auto">
                {/* ❌ X Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-red-500 transition delay-50 duration-300 ease-in-out"
                    disabled={loading}
                >
                    ×
                </button>

                {/* ⬅️ Back Button */}
                {isRegister && (
                    <button 
                        onClick={() => setIsRegister(false)} 
                        className="absolute top-4 left-4 text-2xl font-bold text-gray-600 hover:text-blue-500 transition delay-50 duration-300 ease-in-out"
                        disabled={loading}
                    >
                        &lt;
                    </button>
                )}

                <h2 className="text-3xl font-bold mb-6 text-bgcolor">
                    {isRegister ? "Register to SmartLearn!" : "Welcome to SmartLearn!"}
                </h2>

                <form onSubmit={isRegister ? handleRegister : handleLogin} className="w-full">
                    {/* Email Input */}
                    <div className="w-full mb-4">
                        <label htmlFor="email" className={`block mb-2 text-sm font-medium ${isEmailError ? 'text-red-700' : 'text-gray-700'}`}>
                            Email
                        </label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`block w-full p-2.5 text-sm rounded-lg 
                                ${isEmailError 
                                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500' 
                                    : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
                                }`}
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                        {isEmailError && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Oh, snapp!</span> Email is required.
                            </p>
                        )}
                    </div>

                    {/* Username Input (Register only) */}
                    {isRegister && (
                        <div className="w-full mb-4">
                            <label htmlFor="username" className={`block mb-2 text-sm font-medium ${isUsernameError ? 'text-red-700' : 'text-gray-700'}`}>
                                Username
                            </label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`block w-full p-2.5 text-sm rounded-lg 
                                    ${isUsernameError 
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500' 
                                        : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
                                    }`}
                                placeholder="Enter your username"
                                disabled={loading}
                            />
                            {isUsernameError && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">Oh, snapp!</span> Username is required.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Password Input */}
                    <div className="w-full mb-4">
                        <label htmlFor="password" className={`block mb-2 text-sm font-medium ${isPasswordError ? 'text-red-700' : 'text-gray-700'}`}>
                            Password
                        </label>
                        <input 
                            type={showPassword ? 'text' : 'password'} 
                            id="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`block w-full p-2.5 text-sm rounded-lg 
                                ${isPasswordError 
                                    ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500' 
                                    : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
                                }`}
                            placeholder="Enter your password"
                            disabled={loading}
                        />
                        {isPasswordError && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Oh, snapp!</span> Password is required.
                            </p>
                        )}
                    </div>

                    {/* Confirm Password Input (Register only) */}
                    {isRegister && (
                        <div className="w-full mb-4">
                            <label htmlFor="confirmPassword" className={`block mb-2 text-sm font-medium ${isConfirmPasswordError || passwordsDontMatch ? 'text-red-700' : 'text-gray-700'}`}>
                                Confirm Password
                            </label>
                            <input 
                                type={showPassword ? 'text' : 'password'} 
                                id="confirmPassword" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className={`block w-full p-2.5 text-sm rounded-lg 
                                    ${isConfirmPasswordError || passwordsDontMatch
                                        ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-red-500 dark:text-red-500 dark:placeholder-red-500' 
                                        : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400'
                                    }`}
                                placeholder="Confirm your password"
                                disabled={loading}
                            />
                            {isConfirmPasswordError && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">Oh, snapp!</span> Confirm password is required.
                                </p>
                            )}
                            {passwordsDontMatch && !isConfirmPasswordError && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">Oh, snapp!</span> Passwords do not match.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Show Password */}
                    <div className="w-full mb-6 flex items-center">
                        <input 
                            id="showPassword" 
                            type="checkbox" 
                            checked={showPassword} 
                            onChange={() => setShowPassword(!showPassword)} 
                            className="mr-2"
                            disabled={loading}
                        />
                        <label htmlFor="showPassword" className="text-sm text-gray-700">Show Password</label>
                    </div>

                    {/* Form Error Message */}
                    {formError && (
                        <div className="w-full mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {formError}
                        </div>
                    )}

                    {/* Buttons */}
                    {isRegister ? (
                        <button 
                            type="submit"
                            className="bg-bgcolor text-white px-4 py-2 rounded-xl text-xl w-full font-bold hover:bg-opacity-80 hover:scale-110 transition delay-50 duration-300 ease-in-out"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Submit"}
                        </button>
                    ) : (
                        <>
                            <button 
                                type="submit"
                                className="bg-bgcolor text-white px-4 py-2 rounded-xl text-xl w-full font-bold hover:bg-opacity-80 hover:scale-110 transition delay-50 duration-300 ease-in-out mb-2"
                                disabled={loading}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>
                            <button 
                                type="button"
                                onClick={() => setIsRegister(true)}
                                className="bg-secondarycolor text-bgcolor px-4 py-2 rounded-xl text-xl w-1/2 font-bold hover:bg-opacity-80 hover:scale-110 transition delay-50 duration-300 ease-in-out"
                                disabled={loading}
                            >
                                Register
                            </button>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Startpage;