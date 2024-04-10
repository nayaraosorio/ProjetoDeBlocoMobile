// import { useState } from 'react'
// import PostsList from '../componentes/PostsList'
// import { useEffect } from 'react';


// const PostsListPage = () => {
//      const [posts, setPosts] = useState([]);

//      useEffect(() => {
//         fetchPosts();
//      }, []);

//      const fetchPosts = async () => {
//         try {
//             const response = await fetch(); //Utilizar API
//             const data = await response.json();
//             setPosts(data);
//         } catch (error) {
//             console.error('Posts não foram encontrados', error);
//         }
//     }


//     retur (
//         <div>
//             <h1>Lista de Tópicos</h1>
//             <PostsList posts={posts} />
//         </div>
//     )
// }


// export default PostsListPage;