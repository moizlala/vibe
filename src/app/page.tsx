import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "@/app/client";




const Page = async() => {
  const queryClient = getQueryClient();
   void queryClient.prefetchQuery(trpc.createAI.queryOptions({ text: "world",}));
  
 
 
  return (  
    <HydrationBoundary state={dehydrate(queryClient)} >
      <Suspense fallback={<div>Loading...</div>}>
        <Client />
      </Suspense>

      
    </HydrationBoundary>
  );
}
 
export default Page;

