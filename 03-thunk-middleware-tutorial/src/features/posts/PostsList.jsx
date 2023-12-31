import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, selectPostsStatus, selectPostsError, fetchPosts } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    const postsStatus = useSelector(selectPostsStatus);
    const postsError = useSelector(selectPostsError);

    useEffect(() => {
        if (postsStatus === "idle") dispatch(fetchPosts());
    }, [postsStatus, dispatch]);

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
            <h2>Posts</h2>
            {content}
        </section>
    );
};

export default PostsList;