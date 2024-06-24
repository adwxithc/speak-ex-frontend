import Skeleton from "react-loading-skeleton"
import 'react-loading-skeleton/dist/skeleton.css'
import PostWraper from "../../../components/layout/PostWraper/PostWraper"

function PostSkeleton() {
  return (
    <div className=" my-5">
      <PostWraper>
        <Skeleton className="h-[10rem] sm:h-[30rem] mb-5" baseColor="#c9c8c8" highlightColor="#dfdede" />
        <Skeleton className="h-8 mb-5" baseColor="#c9c8c8" highlightColor="#dfdede" />
        <div className="flex items-center gap-3 mb-8">
          <span className="h-16 w-16 ">
            <Skeleton circle className="h-full w-full"  baseColor="#c9c8c8" highlightColor="#dfdede" />
          </span>

          <span className=" w-32 ">
          <Skeleton count={2}  baseColor="#c9c8c8" highlightColor="#dfdede" />

          </span>
        </div>
        <div>
        <Skeleton count={10}  baseColor="#c9c8c8" highlightColor="#dfdede" />

        </div>
      </PostWraper>

    </div>
  )
}

export default PostSkeleton
