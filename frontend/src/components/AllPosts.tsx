import { User } from "../hooks/types";
import BlogCard from "./Blog/BlogCard";

const AllPosts = ({ userData }: { userData: User }) => {
    return (
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
    )
}

export default AllPosts
