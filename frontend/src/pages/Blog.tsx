import { useParams } from 'react-router-dom';

import { useBlog } from '../hooks/blogHooks';
import FullBlog from '../components/Blog/FullBlog';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar';

const Blog = () => {
    const { id } = useParams();
    const { blog, loading } = useBlog({ id: id || "" });

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <div>
            <Navbar write={true} />
            <div className="flex justify-center ">
                <div className="flex flex-col justify-center w-5/6 ">
                    <FullBlog blog={blog!} />
                </div>
            </div>
        </div>
    )
}

export default Blog
