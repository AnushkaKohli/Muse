import Avatar from "../components/Blog/Avatar";
import BlogCard from "../components/Blog/BlogCard";
import Navbar from "../components/Navbar";
import Skeleton from "../components/Skeleton";
import { useUserBlogs } from "../hooks/blogHooks"

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
                            <div className="col-span-7 border-r">
                                <div className="flex justify-center">
                                    <div className="flex flex-col justify-center w-5/6 max-w-screen-lg gap-7 md:w-2/3">
                                        {userData?.posts.map((blog) => {
                                            return (
                                                <div>
                                                    <div
                                                        className={` font-bold text-lg`}>
                                                        {blog.published
                                                            ? "Published"
                                                            : "Not published"}
                                                    </div>
                                                    <BlogCard
                                                        authorId={blog.authorId}
                                                        key={blog.id}
                                                        id={blog.id}
                                                        authorName={userData.name}
                                                        content={blog.content}
                                                        title={blog.title}
                                                        publishedDate={blog.postedOn.substring(
                                                            0,
                                                            8
                                                        )}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* Side bar */}
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
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default UserBlogs
