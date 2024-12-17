import { auth } from '@/auth'
import OpportunityForm from '@/components/OpportunityForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page =async () => {

    const session = await auth();
    if(!session) redirect('/')
  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <h1 className="heading">Submit your Ideas</h1>
        </section>

        <OpportunityForm/>
    </>
  )
}

export default page