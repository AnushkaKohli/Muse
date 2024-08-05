import { useEffect, useState } from 'react'
import { marked } from 'marked';
import DOMPurify from "dompurify";

const Preview = ({ text }: { text: string }) => {
    const [parsed, setParsed] = useState<string>("");

    useEffect(() => {
        const parseMarkdown = async () => {
            const markdownHtml = await marked(text);
            const sanitizedHtml = DOMPurify.sanitize(markdownHtml);
            setParsed(sanitizedHtml);
        };

        parseMarkdown();
    }, [text]);
    return (
        <div className="overflow-auto">
            <div
                className="font-serif "
                dangerouslySetInnerHTML={{ __html: parsed }}
            />
        </div>
    )
}

export default Preview
