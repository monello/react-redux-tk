import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButons from "./ReactionButons";
import { IPost } from "./postsSlice";

interface PostExceptProps {
    post: IPost;
}

const PostsExcerpt = ({ post }: PostExceptProps) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.id} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButons post={post} />
        </article>
    );
};

export default PostsExcerpt;
