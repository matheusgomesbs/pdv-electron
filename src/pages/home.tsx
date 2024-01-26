import { useNavigate } from "react-router-dom";

import Clock from "@/components/clock";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Clock className="text-9xl font-thin" />      
      <div className="mt-8 space-y-4 max-w-96 w-full">
        <Button className="w-full" size="lg" type="submit">Abrir Caixa</Button>
        <Button className="w-full" size="lg" variant="outline" type="submit">Consultar Preços</Button>
        <Button 
          className="w-full bg-transparent border-red-500 text-red-500 hover:bg-transparent hover:text-red-400"
          variant="outline"
          size="lg"
          type="button"
          onClick={() => navigate('/')}
          >
            Trocar Operador
          </Button>
      </div>
    </div>
  )
}