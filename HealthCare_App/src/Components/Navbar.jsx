import React, { useState, useCallback, useEffect } from 'react';
import { useUser } from '../Store/zustand.js';
import { LogOut } from '../Server/Server.js';
import Button from './Button.jsx';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const user = useUser(useCallback(state => state.user, []));
    const setUser = useUser(useCallback(state => state.setUser, []));
    const navigate = useNavigate();
    // console.log("Username:- ", user);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = async () => {
        console.log("Logout clicked");
        setUser(null);
        setDropdownOpen(!isDropdownOpen);
        await LogOut();
    }

    useEffect(() => {
        setDropdownOpen(false);
    }
        , [navigate, user, setUser]);

    return (
        <nav className="bg-gray-100 border-b border-gray-300 shadow-lg">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto py-3">
                {/* Logo Section */}
                <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <img
                        src="https://iitj.ac.in/images/logo/Design-of-New-Logo-of-IITJ-2.png"
                        className="h-10 rounded-full shadow-md"
                        alt="Logo"
                    // onClick={() => window.open('https://www.iitj.ac.in/', '_blank')}
                    />
                    <span className="text-2xl font-semibold text-gray-800"
                    // onClick={() => navigate("/")}
                    >HealthCare</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-6 rtl:space-x-reverse cursor-pointer">
                    <div
                        onClick={() => navigate("/")}
                        className="text-gray-800 hover:text-blue-700 transition">Dashboard</div>
                    <div
                        onClick={() => navigate("/about")}
                        className="text-gray-800 hover:text-blue-700 transition">About</div>
                    <div
                        onClick={() => navigate("/services")}
                        className="text-gray-800 hover:text-blue-700 transition">Services</div>
                    <div
                        onClick={() => navigate("/contact")}
                        className="text-gray-800 hover:text-blue-700 transition">Contact</div>
                    <div
                        onClick={() => navigate("/queue-page")}
                        className="text-gray-800 hover:text-blue-700 transition">Queue Page</div>
                    
                    <div
                        onClick={() => navigate("/add-to-queue")}
                        className="text-gray-800 hover:text-blue-700 transition">Cunsult Online</div>
                
                </div>

                {/* User Menu */}
                {user ? (
                    <div className="relative flex items-center space-x-4 rtl:space-x-reverse">
                        <button
                            type="button"
                            onClick={toggleDropdown}
                            className="flex items-center justify-center w-10 h-10 border-2 border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <img
                                className="w-8 h-8 rounded-full text-white"
                                src={user?.avatar?.trim() ?? "https://img.icons8.com/?size=100&id=H101gtpJBVoh&format=png&color=000000"}
                                alt="User"
                            />

                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 text-white top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-700 dark:border-gray-600 z-10">
                                <div className="px-4 py-3">
                                    <p className="text-sm font-medium text-gray-300">{user?.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                </div>
                                <ul className="py-2 text-white cursor-pointer">
                                    <li>
                                        <div
                                            onClick={() => navigate("/user/profile")}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition"
                                        >
                                            Profile
                                        </div>
                                    </li>
                                    <li>
                                        <div
                                            onClick={() => navigate("/user/settings")}
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition"
                                        >
                                            Settings
                                        </div>
                                    </li>
                                    <li>
                                        <span
                                            className="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-black transition"
                                            onClick={handleLogout}
                                        >
                                            Sign out
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center space-x-3">
                        <Button
                            text="Login"
                            onClick={() => navigate("/login-user")}
                        />
                        <Button
                            text="register"
                            onClick={() => navigate("/register-user")}
                            class_Name='bg-indigo-600 text-white hover:bg-indigo-500 '
                        />
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
