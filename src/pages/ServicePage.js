import React, {useState} from 'react';
// import PostList from '../components/PostsList';
import CreatePost from '../components/CreatePost/Index';
import { useAuth } from '../AuthContext';

// const initialPosts = [
//   { 
//     id: 1, 
//     userInitial: 'A', 
//     userName: 'Alice', 
//     bookTitle: 'O Senhor dos Anéis',
//     content: 'Conteúdo da postagem de Alice...', 
//     timestamp: '2024-06-04T12:34:56Z',
//     comments: [
//       { userInitial: 'B', userName: 'Bob', message: 'Ótimo post, Alice!' },
//       { userInitial: 'C', userName: 'Charlie', message: 'Concordo com você, Alice.' }
//     ]
//   },
//   { 
//     id: 2, 
//     userInitial: 'B', 
//     userName: 'Bob', 
//     bookTitle: 'Harry Potter e a Pedra Filosofal',
//     content: 'Conteúdo da postagem de Bob...', 
//     timestamp: '2024-06-04T14:22:33Z',
//     comments: [
//       { userInitial: 'A', userName: 'Alice', message: 'Obrigado por compartilhar, Bob!' }
//     ]
//   }
// ];


const ServicePage = () => {
  // const { isAuthenticated, login, logout } = useAuth();
  // const [posts, setPosts] = useState(initialPosts);

  // const handleCreatePost = (newPost) => {
  //   setPosts([newPost, ...posts]);
  // };

  return (
    <div>
      <h1>Fórum</h1>
      {/* {isAuthenticated ? (
        <div>
          <button onClick={logout}>Logout</button>
          <CreatePost onCreatePost={handleCreatePost} />
        </div>
      ) : (
        <div>
          <button onClick={() => login('username', 'password')}>Login</button>
        </div>
      )} */}
      {/* <PostList posts={posts} isAuthenticated={isAuthenticated} /> */}
    </div>
  );
}

export default ServicePage;
