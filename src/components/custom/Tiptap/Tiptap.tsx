import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import { useCallback } from "react";

const Tiptap = ({ onEditerContentSave }: {onEditerContentSave:(html: string) => void}) => {
  const handleChange = (newContent: string) => {
    onEditerContentSave(newContent);
  };

  const content=``
  const editor = useEditor({
    extensions: [
      StarterKit,
       Underline,
       Document,
      Paragraph,
      Text,
      Heading,
      Dropcursor,
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),],
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-primary   w-full gap-3 font-medium  pt-4 rounded-bl-md rounded-br-md outline-none min-h-[100px] max-h-[300px] overflow-y-scroll",
      },
    },
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });



  const addImage= useCallback(()=>{
    const url = window.prompt('URL')
    if(url && editor){
      editor.chain().focus().setImage({src:url}).run()
    }
  },[editor])

  if (!editor) {
    return null
  }

  return (
    <div className="w-full px-4">
      <Toolbar editor={editor} content={content}/>
      <button onClick={addImage}>setImage</button>
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;