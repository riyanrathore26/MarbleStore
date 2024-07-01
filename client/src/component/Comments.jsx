import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Comments({ productId }) {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(0);
    const [commentValue, setCommentValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/showcomments/${productId}`);
                if (response.ok) {
                    const data = await response.json();
                    setComments(data);
                } else {
                    console.error("Failed to fetch comments");
                }
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };

        fetchData();
    }, [showComments]);

    const handleCommentChange = (event) => {
        setCommentValue(event.target.value);
    };

    const handleSubmit = async (event) => {
        const user = localStorage.getItem('firstname');
        event.preventDefault();

        if (!commentValue) {
            toast.warn("Please enter a comment before submitting.", {
                position: 'top-center',
                autoClose: 3000,
            });
            return;
        }
        if (!user) {
            toast.warn("Please login before submitting.", {
                position: 'top-center',
                autoClose: 3000,
            });
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/addcomment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId, comment: commentValue, username: user }),
            });

            if (response.ok) {
                setShowComments(showComments + 1);
                const newComment = await response.json();
                setComments([...comments, newComment]);
                setCommentValue('');
                toast.success("Comment added successfully!", {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                console.error("Failed to add comment");
            }
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    return (
        <>
            <div className="commnetform">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Add Comments"
                        value={commentValue}
                        onChange={handleCommentChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
            <h1>Comments:-</h1>
            <div className="comments-grid">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <h3>{comment.comment}</h3>
                        <h6 style={{ backgroundColor: 'lightgray' }}>Commented By:- {comment.username} at {new Date(comment.datetime).toLocaleString('en-US', { date: 'short', time: 'short' })}</h6>
                        <hr />
                    </div>
                ))}
            </div>
            <ToastContainer />
        </>
    );
}
