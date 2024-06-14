// import React, { useState } from 'react';
// import { useAuth } from '../../AuthContext';
// import { firestoreDB } from '../../firebaseConfig';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// const CreatePost = () => {
//   const [title, setTitle] = useState('');
//   const [comment, setComment] = useState('');
//   const { user } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!title || !comment) {
//       alert('Por favor, preencha todos os campos.');
//       return;
//     }

//     try {
//       await addDoc(collection(firestoreDB, 'posts'), {
//         title,
//         comment,
//         authorUID: user.uid,
//         authorName: user.displayName || user.email,  // Inclui o nome ou email do usuário
//         createdAt: serverTimestamp(),
//         likes: 0,
//         dislikes: 0,
//         comments: []
//       });

//       setTitle('');
//       setComment('');
//       alert('Publicação adicionada com sucesso!');
//     } catch (error) {
//       console.error('Erro ao adicionar publicação ao Firestore:', error);
//       alert('Erro ao adicionar publicação. Tente novamente.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Título:
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </label>
//       </div>
//       <div>
//         <label>
//           Comentário:
//           <textarea
//             value={comment}
//             onChange={(e) => setComment(e.target.value)}
//             required
//           />
//         </label>
//       </div>
//       <button type="submit">Enviar</button>
//     </form>
//   );
// };

// export default CreatePost;
