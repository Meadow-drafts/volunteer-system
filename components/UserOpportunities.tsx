import { client } from '@/sanity/lib/client'
import { OPPORTUNITIES_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import OpportunityCard, { OpportunityCardType } from './OpportunityCard'

const UserOpportunities = async ({id}:{id:Promise<{id:string}>}) => {

    const opportunities = await client.fetch(OPPORTUNITIES_BY_AUTHOR_QUERY, {id})
  return (
    <>
        {opportunities.length > 0 ? opportunities.map((opportunity:OpportunityCardType) => (
            <OpportunityCard key={opportunity._id} post={opportunity} />
        )):(
            <p className='no-result'>No opportunities</p>
        )}
    </>
  )
}

export default UserOpportunities