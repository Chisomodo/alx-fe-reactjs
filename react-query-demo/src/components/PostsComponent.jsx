import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const PostsComponent = () => {
  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  };

  const { isLoading, isError, data: posts, error, refetch } = useQuery('posts', fetchPosts, {
    cacheTime: 1000 * 60 * 5, // 5 minutes
    staleTime: 1000 * 30, // 30 seconds
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  if (isLoading) return 'Loading...';

  if (isError) return `An error has occurred: ${error.message}`;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts && posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      <button onClick={refetch}>Refresh Posts</button>
    </div>
  );
};

export default PostsComponent;