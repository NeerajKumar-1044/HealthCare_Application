import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { GoogleAuthLogin } from '../Server/Server.js';
import {useUser} from '../Store/zustand.js'

function Login() {
    const navigate = useNavigate();
    const setUser = useUser(useCallback(state => state.setUser, []));
    const [error, setError] = useState('');

    const handleGoogleLogin = async (response) => {
        console.log('Google Login');
        // e.preventDefault()
        try {
            const user = await GoogleAuthLogin(response);
            if(user) {
                await setUser(user);
                navigate('/')
            }
        } catch (error) {
            console.log(error);
            setError('Google login failed');
        }
    }




    return (
        <GoogleOAuthProvider clientId={String(import.meta.env.VITE_GOOGLE_CLIENT_ID)}>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="IITJ"
                        src="/iitjlogo1.png"
                        className="mx-auto h-28 w-auto"
                    />
                    <h2 className="mt-5 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Log in to your account
                    </h2>
                    {error && <p className="mt-2 text-center text-sm/6 text-red-600">{error}</p>}
                </div>

                <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <span
                                        onClick={() => navigate('/reset-user-password')}
                                        className="font-semibold text-indigo-600 cursor-pointer hover:text-indigo-500">
                                        Forgot password?
                                    </span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <Button
                                text="Sign in"
                            />
                        </div>
                    </form>

                    <p className='mt-2 mb-1 text-center text-sm/6 text-gray-500'>
                        or
                    </p>

                    <GoogleLogin
                        onSuccess={(response) => {
                            console.log(response);
                            handleGoogleLogin(response);
                        }}
                        // onError={() => setError('Google login failed')}
                        useOneTap
                        size="large"
                        shape="pill"
                        text="Login with Google"
                        />


                    <p className="mt-3 text-center text-sm/6 text-gray-500">
                        Don't have an account{' '}
                        <span onClick={() => navigate('/register-user')}
                            className='cursor-pointer text-blue-500'>Register</span>
                    </p>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login