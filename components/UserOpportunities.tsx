/* eslint-disable @typescript-eslint/no-explicit-any */
/*eslint-disable @typescript-eslint/no-unused-vars*/
import { client } from "@/sanity/lib/client";
import { OPPORTUNITIES_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import OpportunityCard, { OpportunityCardType } from "./OpportunityCard";
import { sanityFetch } from "@/sanity/lib/live";

const UserOpportunities = async ({ id }: { id: string }) => {
  const opportunities = await client.fetch(OPPORTUNITIES_BY_AUTHOR_QUERY, {
    id,
  });
  // const opportunities = await sanityFetch({
  //   query: OPPORTUNITIES_BY_AUTHOR_QUERY,
  //   params: { id },
  // });
  const formattedOpportunities: OpportunityCardType[] = opportunities?.map(
    ({ author, ...rest }: any) => rest
  );
  return (
    <>
      {formattedOpportunities.length > 0 ? (
        formattedOpportunities.map((opportunity: OpportunityCardType) => (
          <OpportunityCard key={opportunity._id} post={opportunity} />
        ))
      ) : (
        <p className="no-result">No opportunities</p>
      )}
    </>
  );
};

export default UserOpportunities;
