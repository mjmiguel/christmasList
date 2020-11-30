import Table from "@editorjs/table";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Underline from "@editorjs/underline";
import Delimiter from "@editorjs/delimiter";

export const EDITOR_JS_TOOLS = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    placeholder: "Type Here",
  },
  header: {
    class: Header,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  underline: {
    class: Underline,
    inlineToolbar: true,
  },
  table: {
    class: Table,
    inlineToolbar: true,
  },
  delimiter: {
    class: Delimiter,
    inlineToolbar: true,
  },
};
