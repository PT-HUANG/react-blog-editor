import Quill from "quill";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Font } from "@/customFormats/font";
import CustomDivider from "@/customBlots/divider";
import CustomLink from "@/customFormats/link";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { cssFiles } from "@/constants/cssFiles";

const icons = ReactQuill.Quill.import("ui/icons") as Record<string, string>;
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

  // 方法1
  // const handleSemanticHTML = () => {
  //   if (quillRef.current) {
  //     const editor = quillRef.current.getEditor();
  //     const length = editor.getLength();
  //     const html = editor.getSemanticHTML(0, length);

  //     // 包裝成完整 HTML 檔案
  //     const fullHtml = htmlStructure1 + cleanHtmlContent(html) + htmlStructure2;

  //     // 建立 blob
  //     const blob = new Blob([fullHtml], { type: "text/html" });

  //     // 建立下載連結
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = "index.html";
  //     a.style.display = "none";

  //     document.body.appendChild(a);
  //     a.click();

  //     // 清除 DOM 和 URL 物件
  //     document.body.removeChild(a);
  //     URL.revokeObjectURL(url);
  //   }
  // };

  // 方法2
  // const handleSemanticHTML = async () => {
  //   if (quillRef.current) {
  //     const editor = quillRef.current.getEditor();
  //     const length = editor.getLength();
  //     const html = editor.getSemanticHTML(0, length);
  //     const fullHtml = htmlStructure1 + cleanHtmlContent(html) + htmlStructure2;

  //     // 使用 File System Access API
  //     try {
  //       // @ts-expect-error: showSaveFilePicker 是實驗性 API
  //       const fileHandle = await window.showSaveFilePicker({
  //         suggestedName: "index.html",
  //         startIn: "desktop",
  //         types: [
  //           {
  //             description: "HTML File",
  //             accept: { "text/html": [".html"] },
  //           },
  //         ],
  //       });

  //       const writable = await fileHandle.createWritable();
  //       await writable.write(fullHtml);
  //       await writable.close();
  //       console.log("儲存完成！");
  //     } catch (err) {
  //       console.error("使用者取消儲存或發生錯誤", err);
  //     }
  //   }
  // };

  // 方法3 jszip
  const handleExport = async () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const length = editor.getLength();
      const html = editor.getSemanticHTML(0, length);
      const fullHtml = htmlStructure1 + cleanHtmlContent(html) + htmlStructure2;

      // debug
      console.log(fullHtml);

      // // 創建新的 ZIP 檔案
      // const zip = new JSZip();

      // const folderName = `CP_${new Date()
      //   .toISOString()
      //   .slice(0, 10)
      //   .replace(/-/g, "")}`;

      // // 建立主資料夾
      // const mainFolder = zip.folder(folderName);

      // // 1. 將 index.html 加入到主資料夾中
      // mainFolder?.file("index.html", fullHtml);

      // // 2. 將外部導入的 CSS 檔案加入到主資料夾底下的 css 資料夾
      // const cssFolder = mainFolder?.folder("css");
      // for (const file of cssFiles) {
      //   cssFolder?.file(file.filename, file.content);
      // }

      // // 3. 創建空的 images 資料夾
      // mainFolder?.folder("images");

      // // 4. 生成 ZIP 檔案並提供下載（ZIP 本身會是 `CP_20250410.zip`，裡面會有 `CP_20250410/` 資料夾）
      // zip.generateAsync({ type: "blob" }).then(function (content) {
      //   saveAs(content, `${folderName}.zip`);
      // });
    }
  };

  const cleanHtmlContent = (html: string): string => {
    html = html.replace(
      / style="background-color: transparent; color: rgb\(0, 0, 0\);"/g,
      ""
    );
    html = html.replace(/background-color: transparent;/g, "");
    html = html.replace(
      / class="ql-align-center"/g,
      ' class="text-align-center"'
    );
    html = html.replace(
      / class="ql-align-right"/g,
      ' class="text-align-right"'
    );
    html = html.replace(
      / class="ql-align-justify"/g,
      ' class="text-align-justify"'
    );
    html = html.replace(/ class="ql-size-large"/g, ' class="font-size-large"');
    html = html.replace(/<p>\s*(<img[^>]+>)\s*<\/p>/g, "$1");
    html = html.replace(/&nbsp;/g, "");
    html = html.replace(/<p><hr><\/p>/g, "<hr>");
    html = html.replace(/<span>\s*((?:.|\n)*?)\s*<\/span>/g, "$1");
    html = html.replace(
      /<span style="background-color: rgb\(255, 255, 255\); color: rgb\(34, 34, 34\);?">\s*((?:.|\n)*?)\s*<\/span>/g,
      "$1"
    );
    html = html.replace(
      /<span style="color: rgb\(0, 0, 0\);?">\s*(.*?)\s*<\/span>/g,
      "$1"
    );
    html = html.replace(
      /<span style="color: rgb\(34, 34, 34\); background-color: rgb\(255, 255, 255\);?">\s*(.*?)\s*<\/span\s*>/g,
      "$1"
    );
    html = html.replace(
      /<span style="background-color:\s*rgb\(255,\s*255,\s*0\);\s*color:\s*rgb\(0,\s*0,\s*0\);?">(.*?)<\/span>/g,
      '<span class="text-highlight">$1</span>'
    );

    let count = 1;

    html = html.replace(
      /<p><img\s+[^>]*src="[^"]+?"([^>]*)><\/p>/g,
      (match, attrs) => {
        return `<p><img src="images/${count++}.jpg"${attrs}></p>`;
      }
    );

    html = html.replace(/<\/p>\s*<p><img/g, "</p>\n<br>\n<p><img");
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
        <!-- Lazy load -->
        <script src="js/lazy.js"></script>

        <!-- ※LP用|編集削除禁止 -->
        <div id="acs_lp_form"></div>
        <script src="https://code.cros.tw/init.js"></script>
        <!-- ※LP用|編集削除禁止 -->
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
          onClick={handleExport}
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
