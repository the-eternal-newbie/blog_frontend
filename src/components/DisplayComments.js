import React, { useState, useRef } from 'react';
import PostComment from './PostComment';
import EditComment from './EditComment';
import Post from './Post';

let i = 0;
const DisplayComments = () => {
    const [content, setContent] = useState('');
    const [editCommentId, setEditCommentId] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [isCreateComment, setIsCreateComment] = useState(false);
    const [isEditComment, setIsEditComment] = useState(false);

    const getContent = useRef();

    const saveContentToState = (event) => {
        setContent(event.target.value);
    };

    const editComment = (id) => {
        setEditCommentId(id);
        toggleEditComment();
    };

    const toggleCreateComment = () => {
        setIsCreateComment(!isCreateComment);
    };

    const toggleEditComment = () => {
        setIsEditComment(!isEditComment);
    };

    const saveComment = (event) => {
        const id = i;
        i++;
        event.preventDefault();
        setAllComments([...allComments, { content, id }]);
        console.log(allComments);
        getContent.current.value = '';
        toggleCreateComment();
    };

    const updateComment = (event) => {
        event.preventDefault();
        const updatedComment = allComments.map((comment) => {
            if (comment.id === editCommentId) {
                return {
                    ...comment,
                    content: content || comment.content,
                };
            }
            return comment;
        });
        setAllComments(updatedComment);
        toggleEditComment();
    };

    const deleteComment = (id) => {
        const modifiedComment = allComments.filter(
            (comment) => comment.id !== id
        );
        setAllComments(modifiedComment);
    };

    if (isCreateComment) {
        return (
            <PostComment
                saveContentToState={saveContentToState}
                getContent={getContent}
                saveComment={saveComment}
            />
        );
    } else if (isEditComment) {
        const comment = allComments.find(
            (comment) => comment.id === editCommentId
        );
        return (
            <EditComment
                content={comment.content}
                updateComment={updateComment}
                saveContentToState={saveContentToState}
            />
        );
    }

    return (
        <>
            <h2>All comments</h2>
            {!allComments.length ? (
                <div>
                    <h3>There are not comments yet!</h3>
                </div>
            ) : (
                allComments.map((comment) => {
                    return (
                        <Post
                            id={comment.id}
                            key={comment.id}
                            content={comment.content}
                            editComment={editComment}
                            deleteComment={deleteComment}
                        />
                    );
                })
            )}
            <br />
            <button onClick={toggleCreateComment}>Post a comment</button>
        </>
    );
};
export default DisplayComments;
