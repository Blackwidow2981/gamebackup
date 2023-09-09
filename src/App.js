import { AppBar, Toolbar} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Route, Routes } from "react-router-dom"

import RegisterForm from './Form';
import PermanentDrawerLeft from './Dashboard';
 
function App() {
  return (
    <React.Fragment>
    <AppBar position='inline' sx={{bgcolor:"red"}} ><Toolbar>
    
      <h2>GAME-The Generative AI Marketing Expert</h2></Toolbar></AppBar>
    <Container>
    <Routes>
      <Route path="/" element={<RegisterForm />} />

    </Routes>
   
     
    </Container>
    </React.Fragment>
  );
}
 
export default App;