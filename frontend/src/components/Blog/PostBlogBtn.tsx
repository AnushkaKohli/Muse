interface PostBlogBtnProps {
    id: string;
    title: string;
    markdown: string;
    postBlog: (id: string, title: string, markdown: string, published: boolean) => Promise<void>;
}

const PostBlogBtn = ({ id, title, markdown, postBlog }: PostBlogBtnProps) => {
    return (
        <div className="flex justify-end gap-3 py-3 mr-5 border-b">
            {title.length === 0 ||
                markdown.length === 0 ||
                markdown === "# Write Markdown" ? (
                <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-full bg-teal-200 border border-transparent cursor-default gap-x-2 e">
                    Publish
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => {
                        postBlog(id, title, markdown, true);
                    }}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white bg-teal-400 border border-transparent  gap-x-2 hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none">
                    Publish
                </button>
            )}
            {title.length === 0 ||
                markdown.length === 0 ||
                markdown === "# Write Markdown" ? (
                <button
                    type="button"
                    className="inline-flex cursor-default items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gray-300 border border-transparent  gap-x-2">
                    Save to draft
                </button>
            ) : (
                <button
                    type="button"
                    onClick={() => {
                        postBlog(id, title, markdown, false);
                    }}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold text-white bg-gray-400 border border-transparent  gap-x-2 hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none">
                    Save to draft
                </button>
            )}
        </div>
    )
}

export default PostBlogBtn
