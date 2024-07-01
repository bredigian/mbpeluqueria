import { SigninForm, SignupForm } from './auth-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function AuthTabs() {
  return (
    <Tabs defaultValue='signin' className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='signin'>Iniciar sesión</TabsTrigger>
        <TabsTrigger value='signup'>Registrarse</TabsTrigger>
      </TabsList>
      <TabsContent value='signin'>
        <SigninForm />
      </TabsContent>
      <TabsContent value='signup'>
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
}
