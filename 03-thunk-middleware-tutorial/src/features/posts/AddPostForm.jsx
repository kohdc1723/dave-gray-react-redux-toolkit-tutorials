import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { set } from "date-fns";

const AddPostForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const [createRequestStatus, setCreateRequestStatus] = useState("idle");
    const users = useSelector(selectAllUsers);

    const isFormValid = [title, content, userId].every(Boolean) && createRequestStatus === "idle";
    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeContent = e => setContent(e.target.value);
    const onChangeAuthor = e => setUserId(e.target.value);
    const onClickSaveButton = () => {
        if (isFormValid) {
            try {
                setCreateRequestStatus("pending");
                dispatch(createPost({ title, body: content, userId })).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
            } catch (err) {
                console.error("failed to create the post", err);
            } finally {
                setCreateRequestStatus("idle");
            }
        }
    };

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onChangeTitle}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onChangeAuthor}
                >
                    <option value="">---Select---</option>
                    {users.map(user => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </select>
                <label htmlFor="postContent">Post Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onChangeContent}
                />
                <button
                    type="button"
                    onClick={onClickSaveButton}
                    disabled={!isFormValid}
                >
                    Save
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;