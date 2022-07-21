import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { postsActions } from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
        setTitle(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setContent(e.target.value);

    const onSavePostClick = () => {
        if (title && content) {
            dispatch(
                postsActions.postAdded({
                    id: nanoid(),
                    title,
                    content,
                })
            );
            setTitle("");
            setContent("");
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
                    onChange={onTitleChanged}
                />
                <label htmlFor="postContent">Content:</label>
                <textarea
                    name="postContent"
                    id="postContent"
                    value={content}
                    onChange={onContentChanged}
                ></textarea>
                <button type="button" onClick={onSavePostClick}>
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
