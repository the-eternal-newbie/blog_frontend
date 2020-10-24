import React from 'react';

const EditComment = (props) => {
    return (
        <form>
            <h1>Edit Comment</h1>
            <textarea
                defaultValue={props.content}
                placeholder="contents"
                onChange={props.saveContentToState}
                rows="8"
                cols="41"
            ></textarea>
            <br />
            <button onClick={props.updateComment}>Update Comment</button>
        </form>
    );
};
export default EditComment;
