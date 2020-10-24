import axios from 'axios';
import React, { useState, createRef, Component } from 'react';
import PostComment from './PostComment';
import EditComment from './EditComment';
import Comment from './Comment';
import '../sass/components/_commentsboard.scss';

let i = 0;
export default class CommentsBoard extends Component {
    constructor() {
        super()
        this.getContent = createRef();
    }
    state = {
        content: '',
        editCommentId: '',
        allComments: [],
        isCreateComment: false,
        isEditComment: false,
    }
    // const [content, setContent] = useState('');
    // const [editCommentId, setEditCommentId] = useState('');
    // const [allComments, setAllComments] = useState([]);
    // const [isCreateComment, setIsCreateComment] = useState(false);
    // const [isEditComment, setIsEditComment] = useState(false);

    // const getContent = useRef();
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/users/comments/`).then(res => {
            const comments = res.data;
            console.log(comments);
            this.setState({allComments: comments})
        });
    }
    saveContentToState = (event) => {
        this.setState({content: event.target.value});
    };

    editComment = (id) => {
        this.setState({editCommentId: id});
        this.toggleEditComment();
    };

    toggleCreateComment = () => {
        this.setState({isCreateComment: !this.isCreateComment});
    };

    toggleEditComment = () => {
        this.setState({isEditComment: !this.isEditComment});
    };

    saveComment = (event) => {
        const comment = {
            userId: 1,
            content: event.target.value
        }
        axios.post(`localhost:8000/users/comments`, { comment }).then(res => {
            console.log(res);
            console.log(res.data);
        })
        this.getContent.current.value = '';
        this.toggleCreateComment();
    };

    updateComment = (event) => {
        event.preventDefault();
        const updatedComment = this.state.allComments.map((comment) => {
            if (comment.id === this.state.editCommentId) {
                return {
                    ...comment,
                    content: "lala" || comment.content,
                };
            }
            return comment;
        });
        this.setState({allComments: updatedComment});
        this.toggleEditComment();
    };

     deleteComment = (id) => {
        const modifiedComment = this.state.allComments.filter(
            (comment) => comment.id !== id
        );
        this.setState({allComments: modifiedComment});
    };

    render() {
        return (
            <div className="comments_board">
                <h2>All comments</h2>
                {!this.state.allComments.length ? (
                    // <div>
                    <h3 className="empty">There are not comments yet!</h3>
                    // </div>
                ) : (
                    this.state.allComments.map((comment) => {
                        if (this.state.isEditComment && comment.id === this.state.editCommentId) {
                            return (
                                <EditComment
                                    createdAt={comment.createdAt}
                                    author={comment.user.username}
                                    content={comment.content}
                                    updateComment={this.updateComment}
                                    saveContentToState={this.saveContentToState}
                                />
                            );
                        } else {
                            return (
                                <Comment
                                    id={comment.id}
                                    key={comment.id}
                                    createdAt={comment.createdAt}
                                    author={comment.user.username}
                                    content={comment.content}
                                    editComment={this.editComment}
                                    deleteComment={this.deleteComment}
                                />
                            );
                        }
                    })
                )}
                {this.state.isCreateComment ? (
                    <PostComment
                        saveContentToState={this.saveContentToState}
                        getContent={this.getContent}
                        saveComment={this.saveComment}
                    />
                ) : (
                    <div></div>
                )}
                <br />
                <button className="post" onClick={this.toggleCreateComment}>Post a comment</button>
            </div>
        );
    }
};
