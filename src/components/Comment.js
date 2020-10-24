import React from 'react';
import '../sass/components/_comment.scss';

const Comment = ({ content, editComment, id, deleteComment }) => {
    return (
        <section class="comment">
            <p>{content}</p>
            <button onClick={() => editComment(id)}>Edit</button>
            <button onClick={() => deleteComment(id)}>Delete</button>
        </section>
    );
};

export default Comment;
