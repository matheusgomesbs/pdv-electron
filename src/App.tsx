import { Route, Routes } from "react-router-dom"

import { ThemeProvider } from './components/theme/theme-provider'

import Home from "./pages/home"
import Login from './pages/login'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>    
    </ThemeProvider>
  )
}

export default App
