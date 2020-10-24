import React, { useState, useRef } from 'react';
import PostComment from './PostComment';

const DisplayComments = () => {
    const [content, setContent] = useState('');
    const [allComments, setAllComments] = useState([]);
    const getContent = useRef();

    const saveCommentContentToState = (event) => {
        setContent(event.target.value);
        console.log(content);
    };

    const saveComment = () => {
        setAllComments([...allComments, { content }]);
        setContent('');
        console.log(allComments);
        getContent.current.value = '';
    };

    return (
        <PostComment
            saveCommentContentToState={saveCommentContentToState}
            getContent={getContent}
            saveComment={saveComment}
        />
    );
};
export default DisplayComments;
