import React from 'react';
import '../sass/components/_comment.scss';

const Comment = (props) => {
    return (
        <section className="comment">
            <h3 className="author">{props.author} commented</h3>
            {
                (new Date().toDateString() === new Date(props.createdAt).toDateString()) ?
                (<><h4 className="date">Today at {
                    new Date(props.createdAt).getHours() + ':' + new Date(props.createdAt).getMinutes()
                    }
                </h4></>) :
                (<><h4 className="date">on {new Date(props.createdAt).toDateString()}</h4></>)
            }
            <p>{props.content}</p>
            <button onClick={() => props.editComment(props.id)}>Edit</button>
            <button onClick={() => props.deleteComment(props.id)}>Delete</button>
        </section>
    );
};

export default Comment;
