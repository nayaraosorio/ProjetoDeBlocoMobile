// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import ThumbDownIcon from '@mui/icons-material/ThumbDown';
// import TextField from '@mui/material/TextField';
// import Divider from '@mui/material/Divider';
// import Typography from '@mui/material/Typography';
// import { useAuth } from '../../AuthContext'; // Ajuste o caminho conforme a localização correta do AuthContext
// import { firestoreDB } from '../../firebaseConfig'; // Ajuste o caminho conforme a localização correta do firebaseConfig
// import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
// import CommentCard from '../CommentCard/Index';

// export default function PostCard({ post }) {
//   const { user, isAuthenticated } = useAuth();
//   const [comment, setComment] = useState('');
//   const postRef = doc(firestoreDB, 'posts', post.id);

//   const handleLike = async () => {
//     await updateDoc(postRef, {
//       likes: arrayUnion(user.uid),
//       dislikes: arrayRemove(user.uid)
//     });
//   };

//   const handleDislike = async () => {
//     await updateDoc(postRef, {
//       dislikes: arrayUnion(user.uid),
//       likes: arrayRemove(user.uid)
//     });
//   };

//   const handleComment = async () => {
//     if (comment.trim() !== '') {
//       await updateDoc(postRef, {
//         comments: arrayUnion({
//           authorUID: user.uid,
//           text: comment,
//           timestamp: Date.now()
//         })
//       });
//       setComment('');
//     }
//   };

//   const formatDate = (timestamp) => {
//     const date = new Date(timestamp);
//     return date.toLocaleString(); // Ajuste o formato conforme necessário
//   };

//   if (!post) {
//     return null; // Retorna null se post for undefined ou null
//   }

//   return (
//     <Box sx={{ maxWidth: 500, margin: 'auto', marginBottom: 2 }}>
//       <Paper elevation={3} sx={{ padding: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Avatar sx={{ marginRight: 2 }}>{post.userInitial}</Avatar>
//             <Box>
//               <span>{post.userName}</span>
//               <Typography variant="body2" color="textSecondary">
//                 {formatDate(post.timestamp)}
//               </Typography>
//             </Box>
//           </Box>
//           <Button variant="text" color="secondary">Denunciar</Button>
//         </Box>
//         <Box sx={{ marginTop: 2, marginBottom: 2 }}>
//           <p>{post.content}</p>
//         </Box>
//         {isAuthenticated && (
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
//             <IconButton aria-label="like" onClick={handleLike}>
//               <ThumbUpIcon />
//             </IconButton>
//             <IconButton aria-label="dislike" onClick={handleDislike}>
//               <ThumbDownIcon />
//             </IconButton>
//           </Box>
//         )}
//         <Divider sx={{ marginY: 2 }} />
//         {isAuthenticated ? (
//           <>
//             <TextField 
//               fullWidth 
//               variant="outlined" 
//               placeholder="Comentários" 
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') {
//                   handleComment();
//                 }
//               }}
//             />
//             <Button onClick={handleComment}>Enviar</Button>
//           </>
//         ) : (
//           <Typography variant="body2" color="textSecondary">
//             Faça login para comentar
//           </Typography>
//         )}
//         <Box sx={{ marginTop: 2 }}>
//           {post.comments && post.comments.map((comment, index) => (
//             <CommentCard key={index} comment={comment} isAuthenticated={isAuthenticated} />
//           ))}
//         </Box>
//       </Paper>
//     </Box>
//   );
// }
