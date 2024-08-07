import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'sonner';

import Navbar from '../components/Navbar';
import PostBlogBtn from '../components/Blog/PostBlogBtn';
import EditorPreview from '../components/Blog/EditorPreview';
import { useBlog } from '../hooks/blogHooks';
import { BACKEND_URL } from '../../config';
import Loader from '../components/Loader';

const Editor = ({ edit }: { edit: boolean }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [markdown, setMarkdown] = useState("# Write Markdown Here");
    const response = useBlog({ id: id || "" });
    const { blog, loading } = edit ?
        response :
        { blog: null, loading: false };

    useEffect(() => {
        if (edit && !loading && blog) {
            setTitle(blog.title);
            setMarkdown(blog.content);
        }
    }, [edit, loading, blog]);

    const postOrEditBlog = async (
        id: string,
        title: string,
        markdown: string,
        published: boolean
    ) => {
        const url = edit ? `${BACKEND_URL}/api/v1/blog` : `${BACKEND_URL}/api/v1/blog`;
        const method = edit ? "put" : "post";
        try {
            console.log("id: ", id);
            console.log("title: ", title);
            console.log("markdown: ", markdown);
            console.log("published: ", published);
            const response = await axios[method](url,
                { id, title, content: markdown, published },
                {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                }
            );
            console.log("response: ", response);
            if (response.status === 200) {
                const message = published
                    ? "Blog Published "
                    : "Saved to Draft";
                toast.success(message, { duration: 2000, });
                setTimeout(() => {
                    navigate("/blogs");
                }, 2000);
            }
        } catch (error) {
            const message = edit ? "Error in editing your post!" : "Error in posting your post!";
            console.log("Error in postOrEditBlog", error);
            toast.error(message, { duration: 2000, });
        }
    }

    return (
        <div>
            <Navbar write={false} />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PostBlogBtn
                        id={id || ""}
                        markdown={markdown}
                        title={title}
                        postBlog={postOrEditBlog}
                    />
                    <EditorPreview
                        markdown={markdown}
                        title={title}
                        setMarkdown={setMarkdown}
                        setTitle={setTitle}
                    />
                </>
            )}
            <Toaster position="top-right" />
        </div>
    );
}

export default Editor
