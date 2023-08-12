import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts, selectPostsStatus, selectPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);

    let content;
    if (postsStatus === "loading") {
        content = <p>Loading...</p>;
    } else if (postsStatus === "succeeded") {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />);
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