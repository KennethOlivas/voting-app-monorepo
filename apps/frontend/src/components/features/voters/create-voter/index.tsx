"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import CreateVoterForm from './create-voter-form'
import { useModal } from '@/hooks/use-modal'

const CreateVoter = () => {
  const { close, isOpen, onChange } = useModal()
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        <Button effect="expandIcon" icon={PlusIcon} iconPlacement="right">
          Add voter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle>A voter</DialogTitle>
          <DialogDescription>
            Add a voter to the list
          </DialogDescription>
        </DialogHeader>
        <CreateVoterForm onSubmitFinished={close} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateVoter
