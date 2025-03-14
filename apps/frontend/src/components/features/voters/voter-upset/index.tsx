"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import VoterForm from './voter-form'
import { useModal } from '@/hooks/use-modal'
import QRInput from '../qr-input'
import { useGetVoter } from '@/hooks/queries'
import { useRouter } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'

type Props = {
  slug?: string
}

const VoterUpset = ({ slug }: Props) => {
  const router = useRouter()
  const { close, isOpen, onChange } = useModal(!!slug)
  const {data, isLoading} = useGetVoter(slug)

  const handleClose = () => {
    close()
    router.replace('/dashboard/admin/voters')
  }

  const handleChange = (open: boolean) => {
    onChange(open)
    if (!open) {
      router.replace('/dashboard/admin/voters')
    }
  }
    
  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogTrigger asChild>
        <Button effect="expandIcon" icon={PlusIcon} iconPlacement="right">
          Add voter
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>A voter</DialogTitle>
          <div className="flex items-center justify-between space-x-2">
            <DialogDescription>
              Add a voter to the list
            </DialogDescription>
            <QRInput />
          </div>
        </DialogHeader>
        {isLoading ? 
          <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-6/12" />
          </div>
        </div> :  
        <VoterForm onCanel={handleClose} onSubmited={handleClose} editData={data}/>}
      </DialogContent>
    </Dialog>
  )
}

export default VoterUpset
