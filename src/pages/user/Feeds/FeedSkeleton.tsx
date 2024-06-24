import Skeleton from "react-loading-skeleton";


function FeedSkeleton() {
  const skeletonItems = ['1', '2', '3', '4'];

  return (
    <>
      {skeletonItems.map((item) => (
        <div key={item}>
          <div className="flex items-center gap-2 mb-2">
            <span>
              <Skeleton
                circle
                height={30}
                width={30}
                baseColor="#c9c8c8"
                highlightColor="#dfdede"
              />
            </span>
            <span className="w-32 h-5">
              <Skeleton
                className="w-full h-full"
                baseColor="#c9c8c8"
                highlightColor="#dfdede"
              />
            </span>
          </div>
          <div className="flex max-h-[150px] sm:max-h-[200px] mb-5">
            <div className="w-3/5 px-3">
              <Skeleton
                height={30}
                className="mb-3"
                baseColor="#c9c8c8"
                highlightColor="#dfdede"
              />
              <Skeleton
                count={4}
                baseColor="#c9c8c8"
                highlightColor="#dfdede"
              />
            </div>
            <div className="w-2/5">
              <Skeleton
                className="h-[150px] sm:h-[200px] w-full"
                baseColor="#c9c8c8"
                highlightColor="#dfdede"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default FeedSkeleton;
