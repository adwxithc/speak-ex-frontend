import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

const Tiptap = ({ onEditerContentSave,content }: {onEditerContentSave:(html: string) => void,content:string}) => {
  const handleChange = (newContent: string) => {
    onEditerContentSave(newContent);
  };


  const editor = useEditor({
    extensions: [
      StarterKit,
       Underline,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-input   w-full gap-3 font-medium  pt-4 rounded-bl-md rounded-br-md outline-none min-h-[100px] max-h-[300px] overflow-y-scroll",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
      // handleChange(JSON.stringify(editor.getJSON()))
    },
    content
  });





  if (!editor) {
    return null
  }

  return (
    <div className="w-full">
      <Toolbar editor={editor} />
      
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor}  />
    </div>
  );
};

export default Tiptap;