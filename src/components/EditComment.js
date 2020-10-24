import React from 'react';
import '../sass/components/_commentbox.scss';

const EditComment = (props) => {
    return (
        <form className="comment_box">
            <textarea
                defaultValue={props.content}
                onChange={props.saveContentToState}
                rows="8"
                cols="41"
            ></textarea>
            <br />
            <button>Cancel</button><button onClick={props.updateComment}>Save Comment</button>
        </form>
    );
};
export default EditComment;
