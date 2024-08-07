import { useParams } from "react-router-dom";

import { useUserData } from "../hooks/userHook";
import { User as UserType } from "../hooks/types";
import Navbar from "../components/Navbar"
import Loader from "../components/Loader";
import UserSidebar from "../components/UserSidebar";
import AllPosts from "../components/AllPosts";

const User = () => {
    const { id } = useParams();

    const { loading, userData } = useUserData(id!);
    return (
        <div>
            <Navbar write={true} />
            {
                loading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="p-6 px-32 overflow-y-auto text-2xl font-bold first-letter:uppercase">
                            {userData?.name}'s Posts:
                        </div>
                        <div className="grid pt-6 lg:grid-cols-10">
                            {/* All posts */}
                            <AllPosts userData={userData as UserType} />
                            {/* Sidebar */}
                            <UserSidebar userData={userData as UserType} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default User
