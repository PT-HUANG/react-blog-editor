import Quill from "quill";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Font } from "@/customFormats/font";
import { CustomSize } from "@/customFormats/size";
import CustomDivider from "@/customBlots/divider";
import CustomLink from "@/customFormats/link";
import CustomVideo from "@/customFormats/video";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { jsFiles } from "@/constants/jsFiles";
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
Quill.register(CustomVideo);

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
        // [{ size: ["small", false, "large", "huge"] }, { font: Font.whitelist }],
        [{ size: CustomSize.whitelist }, { font: Font.whitelist }],
        ["divider", "bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "video"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
    },
  };

  const handlePreview = () => {
    const previewWindow = window.open("", "_blank");
    if (!previewWindow) return;
    const doc = previewWindow.document;

    // head
    const head = doc.head;
    const style = doc.createElement("style");
    let cssContent = ``;
    for (const file of cssFiles) {
      cssContent += file.content;
    }
    style.textContent = cssContent;
    head.appendChild(style);

    // body
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const length = editor.getLength();
      const html = editor.getSemanticHTML(0, length);
      const content = cleanHtmlContent(html);
      doc.body.innerHTML = `<div class="CP">${content}</div>`;
    }
  };

  const handleExport = async () => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const length = editor.getLength();
      const html = editor.getSemanticHTML(0, length);
      const content = replaceImgSrc(cleanHtmlContent(html));
      const fullHtml = htmlStructure1 + content + htmlStructure2;

      // debug
      console.log(fullHtml);

      // 創建新的 ZIP 檔案
      const zip = new JSZip();

      const folderName = `CP_${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}`;

      // 建立主資料夾
      const mainFolder = zip.folder(folderName);

      // 1. 將 index.html 加入到主資料夾中
      mainFolder?.file("index.html", fullHtml);

      // 2-1. 將外部導入的 JavaScript 檔案加入到主資料夾底下的 js 資料夾
      const jsFolder = mainFolder?.folder("js");
      for (const file of jsFiles) {
        jsFolder?.file(file.filename, file.content);
      }

      // 2-2. 將外部導入的 CSS 檔案加入到主資料夾底下的 css 資料夾
      const cssFolder = mainFolder?.folder("css");
      for (const file of cssFiles) {
        cssFolder?.file(file.filename, file.content);
      }

      // 3. 創建空的 images 資料夾
      mainFolder?.folder("images");

      // 4. 生成 ZIP 檔案並提供下載（ZIP 本身會是 `CP_20250410.zip`，裡面會有 `CP_20250410/` 資料夾）
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `${folderName}.zip`);
      });
    }
  };

  const replaceImgSrc = (html: string): string => {
    // ---------- 🖼️ 處理圖片 ----------
    let count = 1;

    // 將所有 img src 改為 images/{count}.jpg
    html = html.replace(
      /<img\s+[^>]*src="[^"]+?"([^>]*)>/gs,
      (_, attrs) => `<img src="images/${count++}.jpg"${attrs}>`
    );

    // 移除完全沒有內容的 <p> 標籤（包含有 class 的情況）
    html = html.replace(/<p[^>]*>\s*<\/p>/g, "");

    return html;
  };

  const cleanHtmlContent = (html: string): string => {
    // ---------- 🎨 清除預設顏色樣式 ----------
    html = html.replace(
      / style="background-color: transparent; color: rgb\(0, 0, 0\);"/g,
      ""
    );
    html = html.replace(/background-color: transparent;/g, "");

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

    // ---------- ✨ 特殊高亮樣式轉 class ----------
    html = html.replace(
      /<span style="background-color:\s*rgb\(255,\s*255,\s*0\);\s*color:\s*rgb\(0,\s*0,\s*0\);?">(.*?)<\/span>/g,
      '<span class="text-highlight">$1</span>'
    );

    // ---------- ✨ 特殊字體顏色樣式轉 class ----------
    html = html.replace(
      /<(\w+)\s+style="[^"]*color:\s*rgb\(255,\s*0,\s*0\)[^"]*">([^<]*)<\/\1>/g,
      '<$1 class="text-red">$2</$1>'
    );

    html = html.replace(
      /<(\w+)\s+style="[^"]*color:\s*rgb\(0,\s*0,\s*255\)[^"]*">([^<]*)<\/\1>/g,
      '<$1 class="text-blue">$2</$1>'
    );

    // ---------- 🏷️ 替換對齊 class ----------
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

    // ---------- 🔠 替換文字大小 class ----------
    html = html.replace(/ class="ql-size-txt-xxs"/g, ' class="txt-xxs"');
    html = html.replace(/ class="ql-size-txt-xs"/g, ' class="txt-xs"');
    html = html.replace(/ class="ql-size-txt-l"/g, ' class="txt-l"');
    html = html.replace(/ class="ql-size-txt-xl"/g, ' class="txt-xl"');
    html = html.replace(/ class="ql-size-txt-big"/g, ' class="txt-big"');

    // ---------- 🧱 清理結構 ----------
    // 移除多餘的 <span> 包裹
    html = html.replace(/<span>\s*((?:.|\n)*?)\s*<\/span>/g, "$1");

    // 將 <p> 包住 <hr> 的情況簡化
    html = html.replace(/<p><hr><\/p>/g, "<hr>");

    // 清除 &nbsp;
    html = html.replace(/&nbsp;/g, " ");

    // 移除 <p> 包住 <img> 的情況（含任何屬性，如 class）
    html = html.replace(/<p[^>]*>\s*(<img[^>]+>)\s*<\/p>/g, "$1");

    // <p></p> => <br>
    html = html.replace(/<p[^>]*><\/p>/g, "<br>");

    // // ---------- 🖼️ 處理圖片 ----------
    // let count = 1;

    // // 將所有 img src 改為 images/{count}.jpg
    // html = html.replace(
    //   /<img\s+[^>]*src="[^"]+?"([^>]*)>/gs,
    //   (_, attrs) => `<img src="images/${count++}.jpg"${attrs}>`
    // );

    // // 移除完全沒有內容的 <p> 標籤（包含有 class 的情況）
    // html = html.replace(/<p[^>]*>\s*<\/p>/g, "");

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
        <!-- <div id="acs_lp_form"></div>
        <script src="https://code.cros.tw/init.js"></script> -->
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
        <Button
          onClick={handlePreview}
          className="mx-1 rounded-sm bg-yellow-400 hover:bg-yellow-300 cursor-pointer"
        >
          Preview
        </Button>
      </div>
    </>
  );
}

export default QuillEditor;
