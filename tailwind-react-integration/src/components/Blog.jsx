// src/components/Blog.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

function Blog() {
  const { id } = useParams(); // Get the 'id' parameter from the URL

  // Fetch the blog post with the given 'id' from your data source
  // ...

  return (
    <div>
      <h1>Blog Post {id}</h1>
      {/* Display the blog post content */}
    </div>
  );
}

export default Blog;