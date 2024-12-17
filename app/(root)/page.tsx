import OpportunityCard, { OpportunityCardType } from "@/components/OpportunityCard";
import SearchForm from "../../components/SearchForm";
import { OPPORTUNITIES_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const session = await auth();

  console.log(session?.id)

  const query = (await searchParams).query;

  const params = {search:query || null} //for the search functionality

  // const posts = await client.fetch(OPPORTUNITIES_QUERY)
  const {data:posts} = await sanityFetch({query:OPPORTUNITIES_QUERY, params}) //to enable live content display ie revalidation

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Give back to society <br /> Connect with others
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Volunteer for opportunities, Connect with like-minded
          people
        </p>

        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Results for "${query}"` : "Latest Opportunities"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts?.map((post:OpportunityCardType) => (
              <OpportunityCard key={post?._id} post={post} />
            ))
          ):(
            <p className="no-result">No Opportunities found</p>
          )}
          
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
