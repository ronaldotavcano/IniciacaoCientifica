import { createRoot } from 'react-dom/client'

import './styles/styles.css'
import Layout from './Layout'
import { BrowserRouter, Routes, Route } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Layout> 
  </BrowserRouter>
)
