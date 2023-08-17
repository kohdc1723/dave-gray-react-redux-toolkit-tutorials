import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddNewPostMutation } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
    const navigate = useNavigate();

    const [addNewPost, { isLoading }] = useAddNewPostMutation();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");
    const users = useSelector(selectAllUsers);

    const isFormValid = [title, content, userId].every(Boolean) && !isLoading;
    const onChangeTitle = e => setTitle(e.target.value);
    const onChangeContent = e => setContent(e.target.value);
    const onChangeAuthor = e => setUserId(e.target.value);
    const onClickSaveButton = async () => {
        if (isFormValid) {
            try {
                await addNewPost({ title, body: content, userId }).unwrap();

                setTitle("");
                setContent("");
                setUserId("");
                navigate("/");
            } catch (err) {
                console.error("failed to create the post", err);
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