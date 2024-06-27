// src/pages/PostListPage.js
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs, doc, updateDoc, increment, addDoc } from 'firebase/firestore';
import { firestoreDB } from '../firebaseConfig';
import PostsList from '../components/PostsList';
import { useAuth } from '../AuthContext';
import CreatePostPopup from '../components/CreatePost/Index';

const PostsListPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(firestoreDB, 'posts'), orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(postsQuery);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt || null,
        }));
        setPosts(postsData);
      } catch (error) {
        console.error('Erro ao buscar postagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    if (user) {
      try {
        const postRef = doc(firestoreDB, 'posts', postId);
        const likeRef = collection(postRef, 'likes');
        await addDoc(likeRef, { userUID: user.uid });

        await updateDoc(postRef, { likes: increment(1) });
        setPosts(posts => posts.map(post => post.id === postId ? { ...post, likes: (post.likes || 0) + 1 } : post));
      } catch (error) {
        console.error('Error liking post:', error);
        alert('Erro ao curtir a postagem. Verifique suas permissões.');
      }
    } else {
      alert('Você precisa estar logado para curtir.');
    }
  };

  const handleDislike = async (postId) => {
    if (user) {
      try {
        const postRef = doc(firestoreDB, 'posts', postId);
        const dislikeRef = collection(postRef, 'dislikes');
        await addDoc(dislikeRef, { userUID: user.uid });

        await updateDoc(postRef, { dislikes: increment(1) });
        setPosts(posts => posts.map(post => post.id === postId ? { ...post, dislikes: (post.dislikes || 0) + 1 } : post));
      } catch (error) {
        console.error('Error disliking post:', error);
        alert('Erro ao descurtir a postagem. Verifique suas permissões.');
      }
    } else {
      alert('Você precisa estar logado para descurtir.');
    }
  };

  const handleComment = async (postId) => {
    console.log('Adicionar comentário em post:', postId);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <CreatePostPopup />
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
