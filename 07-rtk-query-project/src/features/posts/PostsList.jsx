import React from "react";
import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();
    const postIds = useSelector(selectPostIds);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        content = postIds.map(postId => <PostsExcerpt key={postId} postId={postId} />);
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    );
};

export default PostsList;