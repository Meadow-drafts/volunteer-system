/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @next/next/no-img-element */
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { OPPORTUNITY_QUERY_BY_ID, PLAYLIST_BY_SLUG_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it'
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import OpportunityCard, { OpportunityCardType } from '@/components/OpportunityCard';

const md = markdownit()
export const experimental_ppr = true

const page = async({params}:{params:Promise<{id:string}>}) => {

    const id = (await params).id;

    // Parallel api fetching 
    const [post, {select:editorPicks}] = await Promise.all([
         client.fetch(OPPORTUNITY_QUERY_BY_ID, {id}),
         client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug:"editor-picks"})
    ])

    if(!post) return notFound()

        const parsedContent = md.render(post?.pitch || '');


  return (
    <>
    <section className='pink_container !min-h-[230px'>
        <p className='tag text-primary'>
            {formatDate(post?._createdAt)}
        </p>
        <h1 className='heading'>{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
    </section>
    <section className='section_container'>
        <img src={post?.image! || ""} alt="thumbnail" className='w-full h-auto rounded' />
    
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
                <Link 
                href={`/user/${post?.author?._id}`} 
                className='flex gap-2 items-center mb-3'>
                    <Image 
                    src={post?.author?.image! || ""} 
                    alt={post?.author?.name!||"author"} 
                    width={64} 
                    height={64} 
                    className='rounded-full drop-shadow-lg'
                    />

                    <div>
                        <p className="text-20-medium">{post?.author?.name}</p>
                        <p className="text-16-medium">@{post?.author?.username}</p>
                    </div>
                </Link>
                <p className="category-tag">{post?.category}</p>
            </div>
            <h3 className="text-30-bold">
                Pitch Details
            </h3>
            {parsedContent ? (
                <article                 
                className='prose max-w-4xl font-work-sans'
                dangerouslySetInnerHTML={{__html:parsedContent}}/>
            ):(
                <p className='no-result'>No details provided</p>
            )}
        </div>
        <hr className="divider" />
        {editorPicks.length > 0 && (
            <div className='max-w-4xl mx-auto'>
                <p className="text-30-semibold">Editor Picks</p>
                <ul className="mt-7 card_grid-sm">
                    {editorPicks.map((opportunity:OpportunityCardType, index:number) => (
                        <OpportunityCard key={index} post={opportunity} />
                    ))}
                </ul>
            </div>
        )}

        <section>
            <Suspense fallback={<Skeleton className='view_skeleton'/>}>
                <View id={id}/>
             </Suspense>
        </section>
    </section>
     
    </>
  )
}

export default page