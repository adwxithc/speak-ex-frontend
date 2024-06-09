import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import { IComment } from "../../../types/database"
import Avatar from "../../ui/avatar/Avatar"
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import CommentForm from "./CommentForm"
import { useGetCommentsMutation } from "../../../redux/features/user/post/postApiSlice"


interface CommentProps {
    comment: IComment,
    onDeleteComment: (commentId: string, handleDeletedComment: (deletedCommentId: string) => void) => Promise<void>
    setActiveComment: Dispatch<SetStateAction<{
        type: 'editing' | 'reply';
        id: string;
    }>>,
    activeComment: {
        type: 'editing' | 'reply';
        id: string;

    },
    postId?: string
    addComment: (text: string, parentId: null | string, handleNewComment: (newCommetn: IComment) => void) => Promise<void>;
    editComment: (text: string, commentId: string, handleUpdatedComment: (newCommetn: IComment) => void) => Promise<void>;
    handleUpdatedComment: (newCommetn: IComment) => void;
    handleDeletedComment: (deletedCommentId: string) => void
}

function Comment({ comment, onDeleteComment, setActiveComment, activeComment, postId, addComment, editComment, handleUpdatedComment, handleDeletedComment }: CommentProps) {

    const [replys, setReplys] = useState<IComment[]>([])

    const { isAuth, userData } = useSelector((state: RootState) => state.user)
    const [getComments, { isLoading: isGetCommentLoading }] = useGetCommentsMutation()


    const [openReply, setOpenReply] = useState(false)
    const [page, setPage] = useState(0)
    const [hasMorePage, setHasMorePage] = useState(false)




    const { isReplying, isEditing, createdAt, canDelete, canEdit, replyId, canReply, totalReplys } = useMemo(() => {
        return {
            isReplying: activeComment && activeComment.type == 'reply' && activeComment.id === comment.id,
            isEditing: activeComment && activeComment.type == 'editing' && activeComment.id === comment.id,
            createdAt: new Date(comment.createdAt).toLocaleDateString(),
            canDelete: userData?.id == comment.user.id,
            canEdit: userData?.id == comment.user.id,
            replyId: comment.parentId ? comment.parentId : comment.id,
            canReply: Boolean(isAuth),
            totalReplys: Math.max(comment.replys, replys.length)
        }
    }, [activeComment, comment, userData, isAuth, replys])



    useEffect(() => {
        if (page === 0 || comment.parentId) return
        console.log('useEffect entered');

        const getReplys = async () => {
            try {
                const limit = 5

                const res = await getComments({ postId, page, parentId: replyId, limit }).unwrap()
                const totalPage = Math.ceil(res.data.totalComments / limit)
                setHasMorePage(totalPage > page)


                setReplys(prev => {
                    const newCommets = [...prev, ...res.data.comments]
                    return newCommets.filter((item, index) => newCommets.findIndex(comment => comment.id == item.id) == index)
                });


            } catch (error) {
                console.log(error);

            }
        }
        getReplys()
    }, [getComments, page, replyId, postId, comment.parentId])




    const handleNewReply = (newReply: IComment) => {
        setReplys(prev => [...prev, newReply])
    }


    const handleUpdatedReply = (newCommetn: IComment) => {
        setReplys(prev => {
            return prev.map(item => item.id == newCommetn.id ? newCommetn : item)

        })
    }
    const handleDeletedReply = (deletedCommentId: string) => {
        setReplys(prev => prev.filter(item => item.id !== deletedCommentId))
    }

    return (
        <div className="p-4 w-full  ">
            <div className="flex flex-wrap gap-1">

                <div className="">
                    <Avatar className="h-8 w-8" src={comment.user.profile} />
                </div>

                <div className=" max-w-[90%]  ">

                    <div className="bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-1">
                        <div className="flex gap-3 items-center justify-between">

                            <span className="  text-blue-600 font-semibold">{comment.user.userName}</span>
                            <span className="text-xs text-gray-500">{createdAt}</span>
                        </div>
                        {
                            isEditing ?
                                <CommentForm submitLabel="Update" handleSubmit={(text) => editComment(text, comment.id, handleUpdatedComment)} handleCancel={() => { setActiveComment({ type: 'editing', id: '' }) }} hasConcelButton initialText={comment.text} />
                                :
                                <div className="text-sm  text-gray-700 text-wrap leading-relaxed">
                                    {comment.text}
                                </div>
                        }
                    </div>

                    <div className="flex gap-2 text-sm cursor-pointer font-semibold text-gray-600 mb-1 ">
                        {canReply && <div className=" hover:text-black" onClick={() => setActiveComment({ type: 'reply', id: comment.id })}>Reply</div>}   {canEdit && <div className=" hover:text-black" onClick={() => setActiveComment({ type: 'editing', id: comment.id })} >Edit</div>}
                        {canDelete && <div className=" hover:text-black" onClick={() => onDeleteComment(comment.id, handleDeletedComment)}>Delete</div>}
                    </div>
                    
                        {isReplying && <div className=" mt-3"><CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, replyId, handleNewReply)} /></div>}

                    
                    <div className="text-blue-600 text-sm cursor-pointer">
                        {
                            totalReplys > 0 && !openReply &&
                            <span onClick={() => { setOpenReply(true); setPage(1) }} >---view replys({totalReplys})</span>
                        }
                    </div>
                    {openReply &&
                        <div className="ml-3">
                            {
                                isGetCommentLoading ?
                                    <div>loading</div>
                                    :
                                    replys.map(comment => <div key={comment.id}><Comment {...{ comment, onDeleteComment, handleDeletedComment: handleDeletedReply, activeComment, setActiveComment, postId, addComment, editComment, handleUpdatedComment: handleUpdatedReply }} /></div>)
                            }
                            {hasMorePage && <div className="flex justify-center"><span className="block rounded text-primary font-semibold p-1 text-sm cursor-pointer mb-8 hover:bg-secondary" onClick={() => { setPage(page => page + 1) }}>View More</span></div>}
                            <span className="text-blue-600 text-sm cursor-pointer" onClick={() => setOpenReply(false)} >---close reply</span>
                        </div>
                    }

                </div>

            </div>


        </div>
    )
}

export default Comment
