import { InputHTMLAttributes, forwardRef, useEffect, useState } from "react";
import { useAddCommentMutation, useDeleteCommentMutation, useGetCommentsMutation, useUpdateCommentMutation } from "../../../redux/features/user/post/postApiSlice";
import Comment from "./Comment";
import { IComment } from "../../../types/database";
import CommentForm from "./CommentForm";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import Container from "../../layout/Container/Container";

interface CommentProps extends InputHTMLAttributes<HTMLDivElement>{
  postId: string
}

const Comments=forwardRef<HTMLDivElement, CommentProps>(
  ({ postId },ref)=>{

    const [comments, setComments] = useState<IComment[]>([]);
    const [page, setPage] = useState(1)
    const [hasMorePage, setHasMorePage] = useState(false)
    const [activeComment, setActiveComment] = useState<{ type: 'editing' | 'reply', id: string }>({ type: 'reply', id: '' })
    const [getComments, { isLoading: isGetCommentLoading }] = useGetCommentsMutation()
    const [createComment] = useAddCommentMutation()
    const [deleteComment] = useDeleteCommentMutation()
    const [updateComment] = useUpdateCommentMutation()
    const { userData } = useSelector((state: RootState) => state.user)
  
    useEffect(() => {
      const fetchComments = async () => {
        const limit = 5
  
        const res = await getComments({ postId, page, limit }).unwrap()
        const totalPage = Math.ceil(res.data.totalComments / limit)
        setHasMorePage(totalPage > page)
  
        setComments(prev => {
          const newCommets = [...prev, ...res.data.comments]
          return newCommets.filter((item, index) => newCommets.findIndex(comment => comment.id == item.id) == index)
        });
      }
      fetchComments()
    }, [page, getComments, postId])
  
    const handleNewComment = (newCommetn: IComment) => {
      setComments(prev => [newCommetn, ...prev])
    }
  
    const editComment = async (text: string, commentId: string, handleUpdatedComment: (newCommetn: IComment) => void) => {
      try {
        const res = await updateComment({ text, commentId, postId }).unwrap()
        const newCommetn = {
          ...res.data,
          user: {
            userName: userData?.userName || '',
            profile: userData?.profile || '',
            id: userData?.id || ''
          }
        }
        setActiveComment({ type: 'reply', id: '' })
        handleUpdatedComment(newCommetn)
  
      } catch (error) {
        console.log(error);
  
      }
    }
  
    const handleUpdatedComment = (newCommetn: IComment) => {
      setComments(prev => {
        return prev.map(item => item.id == newCommetn.id ? newCommetn : item)
  
      })
    }
  
    const addComment = async (text: string, parentId: null | string, handleNewComment: (newCommetn: IComment) => void) => {
      try {
        const res = await createComment({ postId, parentId, text }).unwrap()
        const newCommetn = {
          ...res.data,
          user: {
            userName: userData?.userName || '',
            profile: userData?.profile || '',
            id: userData?.id || ''
          }
        }
        handleNewComment(newCommetn)
        setActiveComment({ type: 'reply', id: '' })
      } catch (error) {
        console.log(error);
  
      }
    }
  
    const handleDeletedComment = (deletedCommentId: string) => {
      setComments(prev => prev.filter(item => item.id !== deletedCommentId))
    }
  
    const onDeleteComment = async (commentId: string, handleDeletedComment: (deletedCommentId: string) => void) => {
      try {
        await deleteComment({ commentId }).unwrap()
        handleDeletedComment(commentId)
  
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <Container>
      <div className="mt-5 max-w-[55rem] mx-auto" >
  
        <div ref={ref}>
  
          <CommentForm submitLabel='write' handleSubmit={(text) => addComment(text, null, handleNewComment)} />
        </div>
        <div className="">
          {
            isGetCommentLoading ?
              <div>Loading..</div>
              :
              comments.map(comment => <div key={comment.id}><Comment {...{ comment, onDeleteComment, addComment, handleDeletedComment, activeComment, setActiveComment, postId, editComment, handleUpdatedComment }} /></div>)
          }
          {
            hasMorePage && <div className="flex justify-center"><span className="text-gray-600 font-semibold hover:bg-secondary p-1 rounded text-sm cursor-pointer" onClick={() => setPage(page => page + 1)}>View More</span></div>
          }
        </div>
      </div>
      </Container>
    )
  }
)

export default Comments
