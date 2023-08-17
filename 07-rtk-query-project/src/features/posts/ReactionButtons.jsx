import React from "react";
import { useAddReactionMutation } from "./postsSlice";

const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕"
};

const ReactionButtons = ({ post }) => {
    const [addReaction] = useAddReactionMutation();

    const onClickReactionButton = (name) => {
        const newValue = post.reactions[name] + 1;
        addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newValue } });
    };

    return (
        <div>
            {Object.entries(reactionEmojis).map(([name, emoji]) => (
                <button
                    key={name}
                    type="button"
                    className="reactionButton"
                    onClick={() => onClickReactionButton(name)}
                >
                    {emoji} {post.reactions[name]}
                </button>
            ))}
        </div>
    );
};

export default ReactionButtons;