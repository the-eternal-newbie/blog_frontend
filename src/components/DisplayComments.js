import React, { useState, useRef } from 'react';
import PostComment from './PostComment';
import Post from './Post';

let i = 0;
const DisplayComments = () => {
    const [content, setContent] = useState('');
    const [allComments, setAllComments] = useState([]);
    const [isCreateComment, setIsCreateComment] = useState(false);
    const getContent = useRef();

    const saveContentToState = (event) => {
        setContent(event.target.value);
    };

    const toggleCreateComment = () => {
        setIsCreateComment(!isCreateComment);
    };

    const saveComment = event => {
        const id = i;
        i++;
        event.preventDefault();
        setAllComments([...allComments, { content, id }]);
        console.log(allComments);
        getContent.current.value = '';
        toggleCreateComment();
    };

    if(isCreateComment) {
        return (
            <PostComment
                saveContentToState={saveContentToState}
                getContent={getContent}
                saveComment={saveComment}
            />
        );
    }
    return(
        <>
            <h2>All comments</h2>
            {!allComments.length ? (
                <div>
                    <h3>There are not comments yet!</h3>
                </div>
            ) : (
                allComments.map(comment => {
                    console.log(comment.content);
                    return(
                        <Post
                            id={comment.id}
                            key={comment.id}
                            content={comment.content}
                        />
                    );
                })
            )}
            <br/>
            <button onClick={toggleCreateComment}>Post a comment</button>
        </>
    )
};
export default DisplayComments;
