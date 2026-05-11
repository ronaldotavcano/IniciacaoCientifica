import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
 
import './assets/index.css'
import Layout from './Layout'
import { ThemeProvider } from './context/ThemeProvider'
 
createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </ThemeProvider>
)
