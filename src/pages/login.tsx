import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import Clock from "@/components/clock";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const formLoginSchema = z.object({
  username: z.string().min(1, {
    message: "Campo obrigatório!",
  }).max(50),
  password: z.string().min(1, {
    message: "Campo obrigatório!",
  }).max(50),
})

export default function Login() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formLoginSchema>) {
    console.log(values)
    navigate('/home')
  }
  
  return (
    <div className="w-full flex flex-col items-center justify-center h-screen">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <Clock className="text-9xl font-thin" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-4 max-w-96 w-full">
        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="select-none">Usuário:</FormLabel>
                <FormControl className="text-sm">
                  <Input className="h-12" type="text" placeholder="Digite seu usuário" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
              <FormLabel className="select-none">Senha:</FormLabel>
              <FormControl>
                <Input className="h-12" type="password" placeholder="*********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
            )}
          />
          <div className="space-y-2">
            <Button className="w-full" size="lg" type="submit">Entrar</Button>
            <Button 
              className="w-full bg-transparent border-red-500 text-red-500 hover:bg-transparent hover:text-red-400"
              variant="outline"
              size="lg"
              type="button"
              >
                Sair do PDV
              </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}