import React from 'react';

const Post = ({ content, editComment, id, deleteComment }) => {
    return (
        <section>
            <p>{content}</p>
            <button onClick={() => editComment(id)}>Edit</button>
            <button onClick={() => deleteComment(id)}>Delete</button>
        </section>
    );
};

export default Post;
