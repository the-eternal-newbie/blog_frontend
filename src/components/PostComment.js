import React from 'react';

const PostComment = (props) => {
    return (
        <form onSubmit={props.saveComment}>
            <h1>Post a comment</h1>
            <textarea
                onChange={props.saveCommentContentToState}
                placeholder="content"
                cols="41"
                rows="8"
                required
                ref={props.getContent}
            ></textarea>
            <br />
            <button>Send comment</button>
        </form>
    );
};

export default PostComment;
