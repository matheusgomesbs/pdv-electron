import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ThemeProvider } from './components/theme/theme-provider'


function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="w-full h-[700px] text-center flex items-center justify-center">
          <h1>Hello PDV Electron</h1>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className="cursor-pointer">Profile</ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">Billing</ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">Team</ContextMenuItem>
        <ContextMenuItem className="cursor-pointer">Sair</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>      
    </ThemeProvider>
  )
}

export default App
