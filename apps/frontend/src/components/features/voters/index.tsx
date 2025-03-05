"use client"
import React from 'react'
import CreateVoter from '@/components/features/voters/create-voter'
import VotersTable from './voters-table'

const Voters = () => {

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Voters</h1>
        <CreateVoter />
      </div>
      <VotersTable />
    </div>
  )
}

export default Voters
