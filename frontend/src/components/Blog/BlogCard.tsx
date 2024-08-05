import { Link } from 'react-router-dom';
import Avatar from './Avatar';
import ShareBtn from './ShareBtn';
import EditBtn from './EditBtn';
import DeleteBtn from './DeleteBtn';
import Preview from './Preview';

interface BlogCardProps {
	authorName: string;
	authorId: string;
	title: string;
	content: string;
	id: string;
	publishedDate: string;
}

const BlogCard = ({
	authorName,
	title,
	authorId,
	content,
	id,
	publishedDate,
}: BlogCardProps) => {
	return (
		<div className="pb-3 border-b border-slate-200">
			<div className="flex items-center justify-between gap-32">
				<div className="flex items-center gap-3 ">
					<Link
						to={"/user/" + authorId}
						className="flex items-center gap-2 hover:scale-105">
						<Avatar name={authorName} />
						<div className="text-base first-letter:uppercase">
							{authorName}{" "}
						</div>
					</Link>

					<div className="pb-3 text-2xl font-bold text-slate-400">
						.
					</div>
					<div className="text-sm text-slate-400">
						{publishedDate}
					</div>
				</div>
				<div className="flex items-center justify-center gap-3">
					<ShareBtn
						link={`${window.location.origin}/blog/${id}`} />
					<EditBtn
						authorId={authorId}
						blogId={id} />
					<DeleteBtn
						blogId={id}
						authorId={authorId} />
				</div>
			</div>
			<Link
				to={"/blog/" + id}
				className="cursor-pointer hover:scale-105">
				<div className="pt-2 font-serif text-2xl font-bold">
					{title}
				</div>
				<div className="pt-1 font-serif font-thin text-slate-600">
					<Preview text={content.slice(0, 450) + "..."} />
				</div>
				<div className="pt-2 text-sm font-normal text-slate-600">
					{`${Math.ceil(content.length / 500) > 1
						? Math.ceil(content.length / 500) + " minutes read"
						: "1 minute read"
						} `}
				</div>
			</Link>
		</div>
	)
}

export default BlogCard
