import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { PostForm } from '../components';
import postService from '../lib/postService';

export default function EditPost() {
  const [post, setPost] = React.useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  // Fetch the post data based on the slug
  React.useEffect(() => {
    if (!slug) navigate('/');
    postService.getPostBySlug(slug)
      .then(post => {
        if (post) setPost(post);
        else navigate('/'); // Redirect if post not found
      })
      .catch(() => navigate('/'));
  }, [slug, navigate]);

  return post ? <PostForm post={post} /> : null;
}
