import { useSelector } from "react-redux";
import { getAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButons from "./ReactionButons";

const PostsList = () => {
    const posts = useSelector(getAllPosts);

    const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButons post={post} />
        </article>
    ));

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;
