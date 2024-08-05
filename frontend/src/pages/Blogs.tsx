import Navbar from "../components/Navbar";
import BlogCard from "../components/Blog/BlogCard";
import { useBlogs } from "../hooks/blogHooks";
import Skeleton from "../components/Skeleton";
import { useUserDetails } from "../hooks/userHook";
import { redirect } from "react-router-dom";

const Blogs = () => {
    const { loading, blogs } = useBlogs();
    const userDetails = useUserDetails(localStorage.getItem("token") as string);
    if (!userDetails) {
        redirect("/signin");
    }

    if (loading) {
        return (
            <div>
                <Navbar write={true} />
                <Skeleton />
            </div>
        );
    }
    return (
        <div>
            <Navbar write={true} />
            <div className="flex justify-center pt-16">
                <div className="flex flex-col justify-center w-5/6 gap-7 lg:w-1/2 md:w-2/3">
                    {blogs.map((blog) => {
                        return (
                            <BlogCard
                                authorId={blog.authorId}
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name}
                                content={blog.content}
                                title={blog.title}
                                publishedDate={blog.postedOn.substring(0, 10)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Blogs
