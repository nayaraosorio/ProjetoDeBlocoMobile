// src/pages/PostsListPage.js
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, updateDoc, increment } from 'firebase/firestore';
import { firestoreDB } from '../firebaseConfig';
import PostsList from '../components/PostsList';
import { useAuth } from '../AuthContext';

const PostsListPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsQuery = query(collection(firestoreDB, 'posts'), orderBy('createdAt', 'desc'), limit(10));
      const querySnapshot = await getDocs(postsQuery);
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (user) {
      const postRef = doc(firestoreDB, 'posts', postId);
      await updateDoc(postRef, { likes: increment(1) });
      setPosts(posts => posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    }
  };

  const handleDislike = async (postId) => {
    if (user) {
      const postRef = doc(firestoreDB, 'posts', postId);
      await updateDoc(postRef, { dislikes: increment(1) });
      setPosts(posts => posts.map(post => post.id === postId ? { ...post, dislikes: post.dislikes + 1 } : post));
    }
  };

  const handleComment = async (postId) => {
    // Aqui você pode abrir um modal ou direcionar para uma página de comentários
    console.log('Adicionar comentário em post:', postId);
  };

  return (
    <div>
      <PostsList
        posts={posts}
        onLike={handleLike}
        onDislike={handleDislike}
        onComment={handleComment}
      />
    </div>
  );
};

export default PostsListPage;
