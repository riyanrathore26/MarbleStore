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
          console.error('Failed to fetch comments');
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };

    fetchData();
  }, [showComments, productId]);

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const Useremail = localStorage.getItem('email');

    if (!commentValue) {
      toast.warn('Please enter a comment before submitting.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }
    if (!Useremail) {
      toast.warn('Please login before submitting.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/addcomment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, comment: commentValue, Useremail }),
      });

      if (response.ok) {
        const newComment = await response.json();
        setComments([...comments, newComment]);
        setCommentValue('');
        toast.success('Comment added successfully!', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        console.error('Failed to add comment');
        toast.error('Failed to add comment.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  return (
    <>
      <div className="w-full max-w-lg mx-auto my-5">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment"
            value={commentValue}
            onChange={handleCommentChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-shadow"
          />
          <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-500 transition-transform transform hover:scale-105">
            Submit
          </button>
        </form>
      </div>

      <h1 className="text-2xl text-center my-6">Comments</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-md shadow-md transition-transform transform hover:-translate-y-1">
              <h3 className="text-lg mb-2">{comment.comment}</h3>
              <h6 className="text-sm text-gray-600 bg-gray-200 p-2 rounded-md">
                Commented by {comment.Useremail.split('@')[0]} at {new Date(comment.datetime).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
              </h6>
              <hr className="my-4 border-gray-200" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No comments available.</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
}
