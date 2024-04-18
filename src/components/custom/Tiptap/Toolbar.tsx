
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
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify
} from "lucide-react";
import ToolTip from "../../ui/ToolTip/ToolTip";


type Props = {
  editor: Editor | null;
  content: string;
};

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) {
    return null;
  }
  return (
    <div
      className="px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start
    gap-5 w-full flex-wrap border border-gray-700"
    >
      <div className="flex justify-start items-center gap-5 w-full lg:w-10/12 flex-wrap ">

    {/* bold */}

        <button
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
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-primary text-white p-2 rounded-lg"
              : "text-primary"
          }
        >
            <ToolTip tooltip="code">  <Code className="w-5 h-5" /></ToolTip>
          
        </button>
        <button
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
      {content && (
        <button
          type="submit"
          className="px-4 bg-primary text-white py-2 rounded-md"
        >
          Add
        </button>
      )}

      
    </div>
  );
};

export default Toolbar;