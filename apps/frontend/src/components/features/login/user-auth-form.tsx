"use client"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/common/password-input'
import { signIn } from "next-auth/react"
import { toast } from 'sonner'
import { LoginUserDto, LoginUserSchema } from '@voting-app/schemas'
import { useRouter } from 'next/navigation'

export function UserAuthForm() {
  const { replace } = useRouter()
  const form = useForm<LoginUserDto>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit({
    email,
    password
  }: LoginUserDto) {

    await signIn('credentials', {
      email,
      password,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        toast.error('Invalid email or password')
        return
      }
      toast.success('Logged in successfully')
      replace('/dashboard')
    })
  }

  return (
    <div className={cn('grid gap-6')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <p

                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </p>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button isLoading={
              form.formState.isSubmitting
            } className='mt-2'>
              Login
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
