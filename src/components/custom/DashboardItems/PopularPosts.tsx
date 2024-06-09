import moment from "moment";
import { IPost } from "../../../types/database"
import Table, { IColumns } from "../table/Table"
import Avatar from "../../ui/Avatar/Avatar";

function PopularPosts({ posts }: { posts: (IPost & { userData: { firstName: string; lastName: string; profile: string; userName: string; } })[] }) {

  const columns: IColumns<(IPost & { userData: { firstName: string; lastName: string; profile: string; userName: string; } })>[] = [

    { Header: 'post', accessor: 'image', Cell: (row: IPost) => (<div className="h-16 w-24"><img className="object-cover object-center h-full w-full rounded " src={row.image} /></div>) },
    {
      Header: 'Auther', accessor: 'userData', Cell: (row: (IPost & { userData: { firstName: string; lastName: string; profile: string; userName: string; } })) => (<div className="flex items-center gap-2"><Avatar src={row.userData.profile} className="h-10 w-10" /> <span>{row.userData.firstName + ' ' + row.userData.lastName
      }</span></div>)
    },
    { Header: 'Title', accessor: 'title' },

    { Header: 'Created At', accessor: 'createdAt', Cell: (row: IPost) => (<span>{moment(row.createdAt).calendar()}</span>) },
    { Header: 'Likes', accessor: 'upvotes', Cell: (row: IPost) => (<span>{row.upvotes?.length}</span>) },

  ];
  return (
    <div className="font-semibold text-black/80 p-5">
      <h3 className=" mb-3" >Most favorit posts</h3>

      <div className=" overflow-hidden rounded-md ">
        <Table columns={columns} data={posts} />
      </div>




    </div>
  )
}

export default PopularPosts
