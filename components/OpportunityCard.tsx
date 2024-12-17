/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @next/next/no-img-element */
import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Author, Opportunity } from "@/sanity.types";
import { Skeleton } from "./ui/skeleton";
import ClipboardButton from "./ClipBoard";
import { auth } from "@/auth";

export type OpportunityCardType = Omit<Opportunity, "author"> & {
  author?: Author;
};
// without prop of author

const OpportunityCard = async({ post }: { post: OpportunityCardType }) => {
  const {
    _createdAt,
    description,
    views,
    author,
    title,
    category,
    image,
    _id,
  } = post;
      const session= await auth();  

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1 5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <h3 className="text-16-medium line-clamp-1">{author?.name}</h3>
          </Link>
          <Link href={`/opportunity/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || " "}
            alt={author?.name!}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>
      <Link href={`/opportunity/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <img src={image} alt="image" className="startup-card_img" />
      </Link>
      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn " asChild>
          <Link href={`/opportunity/${_id}`}>
            <span className="">Read More</span>
          </Link>
        </Button>
      </div>
      <div
      className={`flex flex-col pt-2  items-end justify-between ${session?.id === author?._id ? "hidden pt-0" : ""}`}    
      
      >
        <p className="text-xs font-semibold">To volunteer contact</p>
        <ClipboardButton textToCopy={author?.email || ""} />
      </div>
    </li>
  );
};

export const OpportunityCardSkeleton = () => {
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>;
};
export default OpportunityCard;
