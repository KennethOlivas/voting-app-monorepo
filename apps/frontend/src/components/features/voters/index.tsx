"use client"
import React from 'react'
import CreateVoter from '@/components/features/voters/create-voter'
import { useGetVoters } from '@/hooks/queries/voters'

const Voters = () => {
  const { data, isLoading, isFetching } = useGetVoters()
  console.log(data, isLoading, isFetching)
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>Voters</h1>
        <CreateVoter />
      </div>
      {JSON.stringify(data)}
    </>
  )
}

export default Voters
