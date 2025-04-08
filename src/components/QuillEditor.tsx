import Quill from "quill";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Font } from "@/customFormats/font";
import CustomDivider from "@/customBlots/divider";
import CustomLink from "@/customFormats/link";

const icons = ReactQuill.Quill.import("ui/icons") as any;
icons["link"] = '<i class="fa-solid fa-link"></i>';
icons["image"] = '<i class="fa-solid fa-image"></i>';
icons["video"] = '<i class="fa-solid fa-film"></i>';
icons["divider"] = '<i class="fa-solid fa-minus"></i>';

type QuillEditorProps = {
  title: string;
  description: string;
  keywords: string;
  GTM: string;
};

Quill.register(CustomDivider);
Quill.register(CustomLink);

function QuillEditor({ title, description, keywords, GTM }: QuillEditorProps) {
  const [content, setContent] = useState("");
  const quillRef = useRef<ReactQuill | null>(null);

  const modules = {
    toolbar: {
      handlers: {
        divider: () => {
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          if (range) {
            editor?.insertEmbed(range.index, "divider", true);
          }
        },
      },
      container: [
        [{ size: ["small", false, "large", "huge"] }, { font: Font.whitelist }],
        ["divider", "bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
  };

  const handleSemanticHTML = () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const length = editor.getLength();
      const html = editor.getSemanticHTML(0, length);
      console.log(htmlStructure1 + cleanHtmlContent(html) + htmlStructure2);
    }
  };

  const cleanHtmlContent = (html: string): string => {
    html = html.replace(
      / style="background-color: transparent; color: rgb\(0, 0, 0\);"/g,
      ""
    );
    html = html.replace(/background-color: transparent;/g, "");
    html = html.replace(/ class="ql-align-center"/g, "");
    html = html.replace(/ class="ql-size-large"/g, ' class="font-size-large"');
    html = html.replace(/<\/?span>/g, "");
    html = html.replace(/<p>\s*(<img[^>]+>)\s*<\/p>/g, "$1");
    html = html.replace(/&nbsp;/g, "");
    return html;
  };

  const htmlStructure1 = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="referrer" content="unsafe-url" />
        <title>${title}</title>
        <!--描述-->
        <meta name="description" content="${description}">
        <!--關鍵字-->
        <meta name="keywords" content="${keywords}">
        <!--縮圖-->
        <meta property="og:image" content="預覽圖 URL" />
        <!--icon-->
        <link rel="shortcut icon" href="icon圖片">
        
        <!-- Google Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
        rel="stylesheet"
        />

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
        <script type="text/javascript" src="main.js"></script>

        <!-- jquery -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <!-- /*畫面跳到指定位置*/ -->
        <script>
            $(document).ready(function () {
                $("a.scrollLink").click(function (event) {
                    event.preventDefault();
                    $("html, body").animate(
                        {
                            /* 0 可以替換 $("class名稱(要記得加.)").height() 【header有需要固定在最上方時 使用這個👇】*/
                            //scrollTop: $($(this).attr("href")).offset().top - $("nav").height(),
                            // 【header不用固定在最上方時 使用這個👇】
                            scrollTop: $($(this).attr("href")).offset().top - 0,
                        },
                        400
                    );
                });
            });
        </script>

        <!-- CSS導入 S -->
        <!-- 顏色 & 大小 總設定 -->
        <link rel="stylesheet" href="css/variables.css">
        <!-- 基礎設定 -->
        <link rel="stylesheet" href="css/normal.css">
        <!-- header 設定 -->
        <link rel="stylesheet" href="css/header.css">
        <!-- 文字設定 -->
        <link rel="stylesheet" href="css/text.css">
        <!-- 其他 -->
        <link rel="stylesheet" href="css/other.css">

        <!-- 購物車樣式 -->
        <link rel="stylesheet" href="css/offer.css">
        <!-- CSS導入 E-->


        <!-- GTM 填寫區 S -->
        <!-- Google Tag Manager -->
        <script>(function (w, d, s, l, i) {
                w[l] = w[l] || []; w[l].push({
                    'gtm.start':
                        new Date().getTime(), event: 'gtm.js'
                }); var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
                        'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', '${GTM}');</script>
        <!-- End Google Tag Manager -->
        <!-- GTM 填寫區 E-->
    </head>
    <body>
        <!-- GTM 填寫區 S -->
        <!-- Google Tag Manager (noscript) -->
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0"
                style="display:none;visibility:hidden"></iframe></noscript>
        <!-- End Google Tag Manager (noscript) -->
        <!-- GTM 填寫區 E-->
        <!--  以下為內文編輯區  -->
        <div class="CP">`;

  const htmlStructure2 = `
        </div>
      </body>
    </html>`;

  return (
    <>
      <ReactQuill
        theme="snow"
        modules={modules}
        value={content}
        onChange={setContent}
        ref={quillRef}
        className="mt-2 rounded-sm"
      />
      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleSemanticHTML}
          className="mx-1 rounded-sm bg-green-500 hover:bg-green-400 cursor-pointer"
        >
          Export
        </Button>
        <Button className="mx-1 rounded-sm bg-yellow-400 hover:bg-yellow-300 cursor-pointer">
          Preview
        </Button>
      </div>
    </>
  );
}

export default QuillEditor;
