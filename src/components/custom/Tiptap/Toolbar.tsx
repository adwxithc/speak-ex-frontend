
import { type Editor } from "@tiptap/react";

import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading1,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Underline,
  TextQuote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ImagePlus
} from "lucide-react";
import ToolTip from "../../ui/toolTip/ToolTip";
import { useCallback } from "react";


type Props = {
  editor: Editor | null;
};

const Toolbar = ({ editor }: Props) => {


  const addImage = useCallback(() => {
    const url = window.prompt('URL')
    const width = '200px';
    const height = 'auto';
    const options = {
      width,
      height,
      alt: 'Enter image alt text here',
      attrs: {
        className: 'w-[200px]', // Apply a CSS class for sizing
      },
    };
    if (url && editor) {
      editor.chain().focus().setImage({ src: url, ...options }).run();
    }
  }, [editor])


  if (!editor) {
    return null;
  }

  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-input"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">


        {/* upload image */}
       
          <button type="button"  onClick={addImage}><ImagePlus /></button>
  
        {/* bold */}

        <button 
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="bold"><Bold className="w-5 h-5" /></ToolTip>

        </button>
        {/* italic */}
        <button 
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="italic"> <Italic className="w-5 h-5" /></ToolTip>
        </button>
        {/* underline */}
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="underline"> <Underline className="w-5 h-5" /></ToolTip>

        </button>
        {/* strick */}
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Strike through"> <Strikethrough className="w-5 h-5" /></ToolTip>

        </button>
        {/* heading */}
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Heading1"> <Heading1 className="w-5 h-5" /></ToolTip>

        </button>
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Heading2"> <Heading2 className="w-5 h-5" /></ToolTip>
        </button>

        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Heading3"> <Heading3 className="w-5 h-5" /></ToolTip>
        </button>
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={
            editor.isActive("heading", { level: 4 })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Heading4"> <Heading4 className="w-5 h-5" /></ToolTip>
        </button>
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
          className={
            editor.isActive("heading", { level: 5 })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Heading5"> <Heading5 className="w-5 h-5" /></ToolTip>
        </button>
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
          className={
            editor.isActive("heading", { level: 6 })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Heading6"> <Heading6 className="w-5 h-5" /></ToolTip>
        </button>
        {/* bullet list */}
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="list"> <List className="w-5 h-5" /></ToolTip>

        </button>
        {/* ordered list */}
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Ordered List"> <ListOrdered className="w-5 h-5" /></ToolTip>

        </button>
        {/* alignment */}
        {/* left */}
        <button
        type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={
            editor.isActive({ textAlign: 'left' })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Align Left"> <AlignLeft /></ToolTip>

        </button>
        {/* center */}
        <button
        type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Align Center">  <AlignCenter /></ToolTip>

        </button>
        {/* right */}
        <button
        type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={
            editor.isActive({ textAlign: 'right' })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Align Right">  <AlignRight /></ToolTip>

        </button>
        {/* justify */}
        <button
        type="button"
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={
            editor.isActive({ textAlign: 'justify' })
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="Align justify">  <AlignJustify /></ToolTip>

        </button>
        {/* right */}
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
          <ToolTip tooltip="block quote">  <TextQuote className="w-5 h-5" /></ToolTip>

        </button>

        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary hover:bg-primary hover:text-white p-1 hover:rounded-lg"
          }
        >
          <ToolTip tooltip="undo">  <Undo className="w-5 h-5" /></ToolTip>

        </button>
        <button
        type="button"
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary hover:bg-primary hover:text-white p-1 hover:rounded-lg"
          }
        >
          <ToolTip tooltip="redo">  <Redo className="w-5 h-5" /></ToolTip>

        </button>


      </div>


    </div>
  );
};

export default Toolbar;