import React, { useState } from 'react';
import Togglable from './Togglable';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    console.log('Like button clicked!');
  }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          {blog.title} by {blog.author}
          <Togglable buttonLabel="View More" cancelLabel="Hide">
            <div>
              <p>{blog.url}</p>
              <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
              <p>Added by: {blog.user.username}</p>
            </div>
          </Togglable >
        </div>
      </div>
    </div>
  )
}

export default Blog
