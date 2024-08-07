import AllPosts from "../components/AllPosts";
import Navbar from "../components/Navbar";
import Skeleton from "../components/Skeleton";
import UserSidebar from "../components/UserSidebar";
import { useUserBlogs } from "../hooks/blogHooks"
import { User } from "../hooks/types";

const UserBlogs = () => {
    const { loading, userData } = useUserBlogs();
    return (
        <>
            <Navbar write={true} />
            {
                loading ? (
                    <Skeleton />
                ) : (
                    <div>
                        <div className="p-6 lg:px-32 overflow-y-auto text-2xl font-bold first-letter:uppercase">
                            All :
                        </div>
                        <div className="grid pt-6 lg:grid-cols-10">
                            {/* All posts */}
                            <AllPosts userData={userData as User} />
                            {/* Sidebar */}
                            <UserSidebar userData={userData as User} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserBlogs
