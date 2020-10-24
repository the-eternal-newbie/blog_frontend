import axios from 'axios';
import React, { createRef, Component } from 'react';
import PostComment from './PostComment';
import EditComment from './EditComment';
import Comment from './Comment';
import '../sass/components/_commentsboard.scss';

export default class CommentsBoard extends Component {
    constructor() {
        super();
        this.getContent = createRef();
    }
    state = {
        content: '',
        editCommentId: '',
        allComments: [],
        isCreateComment: false,
        isEditComment: false,
    };

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/users/comments/`).then((res) => {
            const comments = res.data;
            this.setState({ allComments: comments });
        });
    }
    saveContentToState = (event) => {
        this.setState({ content: event.target.value });
    };

    editComment = (id) => {
        this.setState({ editCommentId: id });
        this.toggleEditComment();
    };

    toggleCreateComment = () => {
        this.setState({ isCreateComment: !this.state.isCreateComment });
    };

    toggleEditComment = () => {
        this.setState({ isEditComment: !this.state.isEditComment });
    };

    saveComment = (event) => {
        event.preventDefault();
        axios
            .post(`http://127.0.0.1:8000/users/comments/`, {
                userId: 1,
                content: this.getContent.current.value,
            })
            .then(() => {
                this.componentDidMount();
                this.toggleCreateComment();
            });
    };

    updateComment = (event) => {
        event.preventDefault();
        axios
            .put(
                `http://127.0.0.1:8000/users/comments/${this.state.editCommentId}`,
                {
                    content: this.state.content,
                }
            )
            .then(() => {
                this.componentDidMount();
                this.toggleEditComment();
            });
    };

    deleteComment = (id) => {
        axios.delete(`http://127.0.0.1:8000/users/comments/${id}`).then(() => {
            this.componentDidMount();
        });
    };

    render() {
        return (
            <div className="comments_board">
                <h2>All comments</h2>
                {!this.state.allComments.length ? (
                    // <div>
                    <h3 className="empty">There are not comments yet!</h3>
                ) : (
                    // </div>
                    this.state.allComments.map((comment) => {
                        if (
                            this.state.isEditComment &&
                            comment.id === this.state.editCommentId
                        ) {
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
                <button className="post" onClick={this.toggleCreateComment}>
                    Post a comment
                </button>
            </div>
        );
    }
}
