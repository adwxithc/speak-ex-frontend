import { FormEvent, useState } from "react"
import Button from "../../ui/button/Button"
import Avatar from "../../ui/Avatar/Avatar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface CommentFormProps {
  handleSubmit: (text: string) => Promise<void>,
  submitLabel: string;
  hasConcelButton?: boolean;
  initialText?: string;
  handleCancel?: () => void
}

function CommentForm({ handleSubmit, submitLabel, hasConcelButton = false, initialText = '', handleCancel }: CommentFormProps) {
  const [text, setText] = useState(initialText)
  const [loading, setLoading] = useState(false)
  const { userData } = useSelector((state: RootState) => state.user)
  const isTextAreaDisabled = text.length == 0
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    await handleSubmit(text)
    setLoading(false)
    setText('')

  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Set the textarea's height based on its content
    e.target.style.height = 'auto'; // Reset the height to auto
    e.target.style.height = e.target.scrollHeight < 150 ? `${e.target.scrollHeight}px` : '150px'; // Set the height to the scroll height
  };
  return (
    <div className="w-full ">

      <div className="flex gap-2  mx-auto">
        <div>
          <Avatar className="w-11 h-11 mt-1" src={userData?.profile} />
        </div>

        <div className="flex-1">
          <form onSubmit={onSubmit} >
            <textarea
              className="border-2  w-full rounded-xl sm:rounded-[35px] sm:pt-3 focus-visible:outline-none  focus-visible:ring-2   resize-none pretty-scrollbar px-5 "

              placeholder="Write something.."
              value={text}
              onChange={handleChange}
            ></textarea>
            <Button disabled={isTextAreaDisabled} varient={'primary'} size={'md'}>{loading ? 'Loading..' : submitLabel}</Button>
            {hasConcelButton && <Button type="button" size={'md'} varient={'primary-outline'} onClick={handleCancel}>Cancel</Button>}
          </form>
        </div>
      </div>




    </div>
  )
}

export default CommentForm
