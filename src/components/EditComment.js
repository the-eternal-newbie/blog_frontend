import React from 'react';

const EditComment = () => {
    return (
        <form>
            <h1>Edit Comment</h1>
            <textarea
                placeholder="contents"
                rows="8"
                cols="41"
                required
            ></textarea>
            <br />
            <button>Update Comment</button>
        </form>
    );
};
export default EditComment;
