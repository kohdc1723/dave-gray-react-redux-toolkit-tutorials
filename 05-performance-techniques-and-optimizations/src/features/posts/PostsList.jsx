import React from "react";
import { useSelector } from "react-redux";
import { selectPostIds, selectPostsStatus, selectPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const postIds = useSelector(selectPostIds);
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);

    let content;
    if (postsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postsStatus === "succeeded") {
        content = postIds.map(postId => <PostsExcerpt key={postId} postId={postId} />);
    } else if (postsStatus === "failed") {
        content = <p>{postsError}</p>;
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default PostsList;