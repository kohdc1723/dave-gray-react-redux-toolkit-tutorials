import React from "react";
import { useDispatch } from "react-redux";
import { addReaction } from "./postsSlice";

const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😮",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕"
};

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();

    const onClickReactionButton = (name) => dispatch(addReaction({ postId: post.id, reaction: name }));

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