import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layouts/Layout';
import Home from '../Pages/Home';
import Estudio from '../Pages/Estudio';
import Estadistica from '../Pages/Estadistica';
import { createTheme, ThemeProvider } from '@mui/material';
import '../Assets/Styles/App.css';

const App = () => {
    const theme = createTheme({
        typography: {
          fontFamily: "'Kdam Thmor Pro', sans-serif", 
        },
      });
    return(
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/estudio" element={<Estudio />} />
                        <Route exact path="/estadistica" element={<Estadistica />} />
                    </Routes>
                </Layout>
            </BrowserRouter> 
        </ThemeProvider>
        
    )
}

export default App;