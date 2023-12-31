import { ThemeProvider } from './components/theme/theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="w-full h-[768px] text-center flex items-center justify-center">
        <h1>Hello PDV Electron</h1>
      </div>
    </ThemeProvider>
  )
}

export default App
