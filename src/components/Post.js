import React from 'react';

const Post = props => {
    return (
        <section>
            <p>{props.content}</p>
            <button>Edit</button>
            <button>Delete</button>
        </section>
    );
};

export default Post;
