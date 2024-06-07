// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useAuth } from './AuthContext';  // Corrigido o caminho

// export default function CreatePost({ onCreatePost }) {
//   const { user } = useAuth();
//   const [isFormVisible, setIsFormVisible] = useState(false);
//   const [bookTitle, setBookTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handlePostSubmit = () => {
//     onCreatePost({ userInitial: user.username.charAt(0), userName: user.username, bookTitle, content, timestamp: new Date().toISOString(), comments: [] });
//     setBookTitle('');
//     setContent('');
//     setIsFormVisible(false);
//   };

//   return (
//     <Box sx={{ maxWidth: 500, margin: 'auto', marginBottom: 2 }}>
//       <Paper elevation={3} sx={{ padding: 2 }}>
//         {!isFormVisible ? (
//           <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => setIsFormVisible(true)}>
//             <Avatar sx={{ marginRight: 2 }}>{user.username.charAt(0)}</Avatar>
//             <TextField fullWidth variant="outlined" placeholder="O que deseja compartilhar?" disabled />
//           </Box>
//         ) : (
//           <Box>
//             <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//               <Avatar sx={{ marginRight: 2 }}>{user.username.charAt(0)}</Avatar>
//               <span>{user.username}</span>
//             </Box>
//             <TextField 
//               fullWidth 
//               variant="outlined" 
//               label="Assunto (Nome do Livro)" 
//               value={bookTitle} 
//               onChange={(e) => setBookTitle(e.target.value)} 
//               sx={{ marginBottom: 2 }}
//             />
//             <TextField 
//               fullWidth 
//               variant="outlined" 
//               label="Conteúdo" 
//               value={content} 
//               onChange={(e) => setContent(e.target.value)} 
//               multiline 
//               rows={4} 
//               sx={{ marginBottom: 2 }}
//             />
//             <Button variant="contained" color="primary" onClick={handlePostSubmit}>
//               Criar Post
//             </Button>
//             <Button variant="text" color="secondary" onClick={() => setIsFormVisible(false)}>
//               Cancelar
//             </Button>
//           </Box>
//         )}
//       </Paper>
//     </Box>
//   );
// }
