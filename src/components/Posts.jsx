// src/pages/Posts.jsx
import React, { useState } from 'react';
import './Posts.css'; // Import the CSS file for styling
import post1Image from '../assets/post1.png'; // Import the image
import post2Image from '../assets/post2.png'; // Import the image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faBell } from '@fortawesome/free-solid-svg-icons';

const postsData = [
  {
    id: 1,
    title: 'First Post',
    content: 'Take a look at my Car!',
    imageUrl: post1Image, // Use imported image
    comments: [
      { id: 1, author: '@jack_sparrow', content: 'Great post!' },
      { id: 2, author: '@wil_turner', content: 'Nice one ✨' }
    ]
  },
  {
    id: 2,
    title: 'Second Post',
    content: 'Take a look at my Photography!',
    imageUrl: post2Image, // Use imported image
    comments: [
      { id: 3, author: '@elizabeth_V', content: 'Nice view!' }
    ]
  }
];

const Posts = () => {
  const [posts, setPosts] = useState(postsData);
  const [newComment, setNewComment] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [notification, setNotification] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (postId) => {
    if (newComment.trim() === '') return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newCommentData = {
          id: post.comments.length + 1,
          author: '@current_user', // Replace with actual user data if available
          content: newComment
        };
        return { ...post, comments: [...post.comments, newCommentData] };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComment('');
    setCurrentPostId(null);
    showNotification('Comment added successfully!');
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  return (
    <div className="posts-container">
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <div className="notification-icon">
        {notification && <FontAwesomeIcon icon={faBell} />}
      </div>
      <h1>Posts</h1>
      {posts.map(post => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <img src={post.imageUrl} alt={post.title} className="post-image" />
          <p>{post.content}</p>
          <h3>Comments:</h3>
          {post.comments.map(comment => (
            <div key={comment.id} className="comment">
              <p><strong>{comment.author}</strong>: {comment.content}</p>
            </div>
          ))}
          <div className="comment-input-container">
            <input
              type="text"
              value={currentPostId === post.id ? newComment : ''}
              onChange={handleCommentChange}
              onFocus={() => setCurrentPostId(post.id)}
              placeholder="Add a comment..."
              className="comment-input"
            />
            <button onClick={() => handleCommentSubmit(post.id)} className="comment-submit-button">
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;
