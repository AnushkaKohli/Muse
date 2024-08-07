import { User } from "../hooks/types"
import Avatar from "./Blog/Avatar"

const UserSidebar = ({ userData }: { userData: User }) => {
    return (
        <div className="hidden p-3 px-10 lg:col-span-3 lg:block">
            <div className="pb-8 text-slate-500">Author: </div>
            <div className="flex items-center gap-5 ">
                <Avatar
                    size="big"
                    name={userData?.name as string} />
                <div className="flex flex-col items-start justify-center">
                    <div className="text-3xl font-extrabold text-slate-800 first-letter:uppercase">
                        {userData?.name}
                    </div>

                    <div className="text-gray-500">{userData?.email}</div>
                </div>

            </div>
            <div className="pt-6 text-lg font-medium">
                Total Blogs: {userData?.posts.length}

            </div>
        </div>
    )
}

export default UserSidebar
