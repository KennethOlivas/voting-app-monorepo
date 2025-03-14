"use client"

import { Button } from "@/components/ui/button"
import { DatePicker } from "@/components/ui/date-picker"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateVoter } from "@/hooks/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateVoterDto, CreateVoterSchema } from "@voting-app/schemas"
import { useForm } from "react-hook-form"

type VoterFormProps = {
  onCanel?: () => void
  onSubmited?: () => void
  editData?: CreateVoterDto
}

const VoterForm = ({ onCanel, onSubmited, editData }: VoterFormProps) => {
  const { mutateAsync, isPending, isError } = useCreateVoter();

  const form = useForm<CreateVoterDto>({
    resolver: zodResolver(CreateVoterSchema),
    defaultValues: {
      firstName: editData?.firstName ?? '',
      middleName: editData?.middleName ?? '',
      lastName: editData?.lastName ?? '',
      voterId: editData?.voterId ?? '',
      email: editData?.email ?? '',
      dateOfBirth: editData?.dateOfBirth ?? '',
      city: editData?.city ?? '',
      gender: editData?.gender ?? 'M',
    },
    mode: "onChange",
    criteriaMode: 'firstError',
  });


  const onSubmit = async (data: CreateVoterDto) => {
    if (editData) {
      console.log('editData', data)
    } else {
      await mutateAsync(data)
      if (isError) return
    }
    onSubmited?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Middle Name" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-4">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="voterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="ID  " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-5">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <DatePicker date={
                      field.value
                    } setDate={(date) => {
                      field.onChange({ target: { value: date?.toString() } })
                    }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} value={field.value ?? ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 md:col-span-2">
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="M">M</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className='flex w-full pt-4 space-x-4'>
          <Button
            onClick={onCanel}
            isLoading={isPending} size="full" type='button' variant="destructive">
            Cancel
          </Button>
          <Button isLoading={isPending} size="full" type="submit">Save</Button>
        </div>
      </form>
    </Form>
  )
}

export default VoterForm
