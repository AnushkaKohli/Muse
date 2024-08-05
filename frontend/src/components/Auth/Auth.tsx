import { useState } from 'react'
import axios from 'axios';
import { SignupType } from '@anushka_kohli/muse-common-app';
import { Toaster, toast } from 'sonner'

import { BACKEND_URL } from '../../../config';
import AuthTitle from './AuthTitle';
import LabelInput from './LabelInput';
import { useNavigate } from 'react-router-dom';

interface AuthProps {
    type: "signup" | "signin";
}

const Auth = ({ type }: AuthProps) => {
    const [user, setUser] = useState<SignupType>({
        email: "",
        password: "",
        name: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"
                }`,
                user
            );
            setLoading(false);

            const jwt = res.data.jwt;
            localStorage.setItem("token", jwt);

            if (res.status === 200) {
                const successMessage =
                    type === "signin"
                        ? "Login Successful"
                        : "Signup Successful";
                toast.success(successMessage);
                navigate('/'); // Redirect to the home page
            }
        } catch (error: any) {
            console.warn(error);
            const errorMessage = error.response.data.message ?? "Invalid Input";
            toast.warning(errorMessage, { duration: 2000, });
        }
    }

    if (loading) {
        return (
            <div className='flex h-full items-center justify-center text-4xl'>
                Loading...
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <AuthTitle type={type} />

            <div className="grid gap-3 pt-10">
                {type === "signin" ? null : (
                    <LabelInput
                        label="Name"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => {
                            setUser({
                                ...user,
                                name: e.target.value,
                            });
                        }} />
                )}
                <LabelInput
                    label="Email"
                    type="text"
                    placeholder="Email"
                    onChange={(e) => {
                        setUser({
                            ...user,
                            email: e.target.value,
                        });
                    }} />
                <LabelInput
                    label="Password"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                        setUser({
                            ...user,
                            password: e.target.value,
                        });
                    }} />
                <button
                    type="button"
                    onClick={handleClick}
                    className="mt-5 text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    {type === "signin" ? "Sign In" : "Sign Up"}
                </button>
            </div>
            <Toaster
                closeButton
                position="top-right"
                duration={1200} />
        </div>
    );
}

export default Auth
