import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from './components/theme/theme-provider'
import Login from './pages/login'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>    
    </ThemeProvider>
  )
}

export default App
