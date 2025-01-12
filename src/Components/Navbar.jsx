import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

const Navbar = (props) => {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full py-4 shadow-md">
            {/* Container */}
            <div className="flex justify-between items-center w-11/12 max-w-[1200px] mx-auto">
                {/* Logo Section */}
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <img
                            src={require("../TEAM.png")}
                            alt="JSR Logo"
                            className="h-12 w-12 rounded-full border-2 border-white shadow-md"
                        />
                        <span className="text-2xl font-bold">DronePatrol</span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <nav>
                    <ul className="flex gap-8 text-lg font-medium">
                        <li>
                            <Link
                                to="/"
                                className="hover:text-yellow-300 transition duration-300"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="hover:text-yellow-300 transition duration-300"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/features"
                                className="hover:text-yellow-300 transition duration-300"
                            >
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/contact"
                                className="hover:text-yellow-300 transition duration-300"
                            >
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Authentication Section */}
                <div className="flex items-center gap-4">
                    {!isLoggedIn && (
                        <Link to="/login">
                            <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 shadow-md">
                                Log In
                            </button>
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <Link to="/signup">
                            <button className="bg-yellow-400 text-black py-2 px-4 rounded-lg hover:bg-yellow-500 transition duration-300 shadow-md">
                                Sign Up
                            </button>
                        </Link>
                    )}
                    {isLoggedIn && (
                        <button
                            className="bg-red-400 text-white py-2 px-4 rounded-lg hover:bg-red-500 transition duration-300 shadow-md"
                            onClick={() => {
                                setIsLoggedIn(false);
                                toast.success("Logged out");
                            }}
                        >
                            Logout
                        </button>
                    )}
                    {isLoggedIn && (
                        <Link to="/dashboard">
                            <button className="bg-green-400 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition duration-300 shadow-md">
                                Dashboard
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
