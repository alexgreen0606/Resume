import { Route, Routes } from 'react-router-dom'
import './styles/globalStyles.css'
import './App.css'
import Resume from './pages/Resume'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import { useTheme } from './styles/ThemeContext'
import { useEffect } from 'react'

function App() {

  const { palette } = useTheme()

  // Ensure the body, root, and html all match the background of the app
  useEffect(() => {
    const appBackgroundColor = palette.background
    document.body.style.backgroundColor = appBackgroundColor;
    document.documentElement.style.backgroundColor = appBackgroundColor;
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.style.backgroundColor = appBackgroundColor;
    }
  }, [palette]);

  return (
    <Routes>
      <Route path='/' element={<Resume />} />
      <Route path='portfolio' element={<Portfolio />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
  )
}

export default App