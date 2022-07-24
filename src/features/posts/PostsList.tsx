import { useEffect } from "react";
import {
    getAllPosts,
    getPostStatus,
    getPostsError,
    fetchPosts,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const PostsList = () => {
    const dispatch = useAppDispatch();

    const posts = useAppSelector(getAllPosts);

    const postStatus = useAppSelector(getPostStatus);
    const error = useAppSelector(getPostsError);

    useEffect(() => {
        if (postStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let renderedPosts;
    if (postStatus === "loading") {
        renderedPosts = <p>Loading</p>;
    } else if (postStatus === "succeeded") {
        const orderedPosts = posts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));

        renderedPosts = orderedPosts.map((post) => (
            <PostsExcerpt key={post.id} post={post} />
        ));
    } else if (postStatus === "failed") {
        renderedPosts = <p>{error}</p>;
    }

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;
