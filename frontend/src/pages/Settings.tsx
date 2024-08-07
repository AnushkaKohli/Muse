import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";

import Navbar from "../components/Navbar";
import LabelInput from "../components/Auth/LabelInput";
import { BACKEND_URL } from "../../config";
import { useUserDetails } from "../hooks/userHook";

interface UpdateDetails {
    name?: string;
    password?: string;
}

const Settings = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const userDetails = useUserDetails(localStorage.getItem("token") as string);

    const handleChange = async () => {
        const body: UpdateDetails = {};
        if (name !== "")
            body.name = name;
        if (password !== "") {
            if (password.length < 6) {
                toast.error("Password should be atleast 6 characters long");
                return; // Exit early if password is invalid
            } else {
                body.password = password;
            }
        }
        try {
            if (body.name === userDetails.name && !body.password) {
                toast("There is nothing to change");
                return; // Exit early if there's nothing to change
            }

            const response = await axios.put(`${BACKEND_URL}/api/v1/user/update`,
                body, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            if (response.status === 200) {
                const updatedUser = body.name;
                toast.success(`Details updated successfully for: ${updatedUser}`, {
                    duration: 2000,
                });
            }
        } catch (error) {
            console.warn(error);
            const errorMessage =
                error.response?.data?.message ?? "Invalid Inputs";
            toast.warning(errorMessage, {
                duration: 2000,
            });
        }
    }
    return (
        <div>
            <Navbar write={true} />
            <div>
                <div className="p-6 px-32 overflow-y-auto text-2xl font-bold text-slate-700 first-letter:uppercase">
                    Settings
                    <br />
                    <div className="text-xl font-light">
                        Change your name or password or both
                    </div>
                    <div className="mt-8">
                        <div className="flex flex-col items-center justify-center gap-3">
                            <LabelInput
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                label="Name"
                                type="text"
                                placeholder="Name" />
                            <LabelInput
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                label="Password"
                                type="password"
                                placeholder="Password" />
                            <button
                                type="button"
                                onClick={() => {
                                    handleChange();
                                }}
                                className="mt-5 px-32 text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm py-2.5 me-2 mb-2">
                                Change
                            </button>
                            <div className="p-10 text-sm font-light ">
                                Logout and login again to reflect changes
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" />
        </div>
    )
}

export default Settings
