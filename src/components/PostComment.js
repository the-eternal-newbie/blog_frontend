import React from 'react';
import '../sass/components/_commentbox.scss';

const PostComment = (props) => {
    return (
        <form onSubmit={props.saveComment} className="comment_box">
            <textarea
                onChange={props.saveContentToState}
                placeholder="What are you thinking..."
                cols="41"
                rows="8"
                required
                ref={props.getContent}
            ></textarea>
            <br />
            <button>Save comment</button>
        </form>
    );
};

export default PostComment;
