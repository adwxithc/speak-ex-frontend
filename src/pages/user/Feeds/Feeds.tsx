
import Container from "../../../components/layout/Container/Container"

import useGetFeeds from "./useGetFeeds"
import { useCallback, useRef, useState } from "react"
import PostPreview from "./PostPreview"
import FeedSkeleton from "./FeedSkeleton"


function Feeds() {

    const [page, setPage] = useState(1)

    const {
        feeds, 
        hasMore,
        isLoading
    } = useGetFeeds({ page })

    const observer = useRef<IntersectionObserver | null>(null)

    const lastPostRef = useCallback((node: HTMLLIElement | null)=>{
        if(isLoading) return
        if (observer.current) observer.current.disconnect()

        observer.current= new IntersectionObserver(entries=>{
            if(entries[0].isIntersecting && hasMore){
                
                setPage(prev=>prev+1)
                
            }
        })
        if(node) observer.current.observe(node)
      
        
    },[isLoading,hasMore])

    return (
        <Container className="md:max-w-[85vw] border-t">
            <div>
                <h1 className="text-center text-3xl font-semibold mb-8">Let's Explore.</h1>
            </div>
            <div className="flex ">
                <main className=" flex-1 h-full" dir="ltr">

                    <ul>
                    { isLoading?
                        <FeedSkeleton/>
                        :
                       
                        feeds.map((post, index)=><li key={post.title+index} ref={ feeds.length==index+1 ?lastPostRef:null}> <PostPreview post={post} /> </li>)
                        
                    }
                    </ul>



                </main>

                <aside className=" lg:w-80 -z-10  hidden lg:block h-full border-l sticky top-16 p-3">
                <span className="font-semibold italic text-lg">"The limits of my language mean the limits of my world."</span>
                </aside>
            </div>


        </Container>
    )
}

export default Feeds
