import { useDispatch } from "react-redux";
import { postsActions, IPost } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
};

interface ReactionButtonsProps {
    post: IPost;
}

const ReactionButons = ({ post }: ReactionButtonsProps) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    type="button"
                    className="reactionButton"
                    onClick={() =>
                        dispatch(
                            postsActions.reactionAdded({
                                postId: post.id,
                                reaction: name,
                            })
                        )
                    }
                >
                    {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
                </button>
            );
        }
    );

    return <div>{reactionButtons}</div>;
};

export default ReactionButons;
