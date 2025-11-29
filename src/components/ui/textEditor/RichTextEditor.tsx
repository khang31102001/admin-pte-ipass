import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import type { Editor as TinyMCEEditor } from "tinymce";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  height?: number;
  variant?: "full" | "simple"; // thêm variant
}

export default function RichTextEditor({
  value,
  onChange,
  height = 500,
  variant = "full",
}: RichTextEditorProps) {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const isSimple = variant === "simple";

  const plugins = isSimple
    ? ["lists", "link", "code", "wordcount"]
    : [
        "advlist",
        "autolink",
        "lists",
        "link",
        "image",
        "charmap",
        "preview",
        "anchor",
        "searchreplace",
        "visualblocks",
        "code",
        "fullscreen",
        "insertdatetime",
        "media",
        "table",
        "help",
        "wordcount",
      ];

  const toolbar = isSimple
    ? "undo redo | bold italic underline | " +
      "alignleft aligncenter alignright | " +
      "bullist numlist | removeformat"
    : "undo redo | blocks | bold italic underline | " +
      "alignleft aligncenter alignright alignjustify | " +
      "bullist numlist outdent indent | " +
      "link image table | forecolor backcolor | removeformat | help";

  return (
    <Editor
      apiKey="kmkahtxwg0ldi8b8alds8vn1spd7z7u08i6e1pgiakd7j7ma"
      onInit={(__, editor) => (editorRef.current = editor)}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      init={{
        height,
        menubar: !isSimple, 
        plugins,
        toolbar,
        branding: false,
        content_style:
          "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px }",
      }}
    />
  );
}
