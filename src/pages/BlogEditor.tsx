import { Input } from "@/components/ui/input";
import QuillEditor from "@/components/QuillEditor";
import { useState } from "react";

function BlogEditor() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [GTM, setGTM] = useState("");
  const [linkUrl, setLinkUrl] = useState("");

  return (
    <>
      <div className="max-w-[1200px] h-full mx-auto my-0 container bg-[#FEF7EC] dark:bg-gray-800 p-8">
        <div className="bg-white border-2 border-[#A99072] rounded-sm p-6 flex flex-col">
          <label className="text-xl font-bold  mb-1">Title</label>
          <Input
            type="text"
            placeholder="文章標題"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-gray-300 rounded-sm focus-visible:border-blue-300 focus-visible:ring-blue-300 focus-visible:ring-[1px]"
          />
          <label className="text-xl font-bold mt-4 mb-1">Description</label>
          <Input
            type="text"
            placeholder="描述"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-gray-300 rounded-sm focus-visible:border-blue-300 focus-visible:ring-blue-300 focus-visible:ring-[1px]"
          />
          <label className="text-xl font-bold mt-4 mb-1">Keywords</label>
          <Input
            type="text"
            placeholder="關鍵字"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="border-gray-300 rounded-sm focus-visible:border-blue-300 focus-visible:ring-blue-300 focus-visible:ring-[1px]"
          />
          <label className="text-xl font-bold mt-4 mb-1">GTM</label>
          <Input
            type="text"
            placeholder="GTM代碼"
            value={GTM}
            onChange={(e) => setGTM(e.target.value)}
            className="border-gray-300 rounded-sm focus-visible:border-blue-300 focus-visible:ring-blue-300 focus-visible:ring-[1px]"
          />
          <label className="text-xl font-bold mt-4 mb-1">跳轉連結</label>
          <Input
            type="text"
            placeholder="輸入想要跳轉的網址"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="border-gray-300 rounded-sm focus-visible:border-blue-300 focus-visible:ring-blue-300 focus-visible:ring-[1px]"
          />
          <div className="text-xl font-bold mt-4">內文編輯區</div>
          <QuillEditor
            title={title}
            description={description}
            keywords={keywords}
            GTM={GTM}
            linkUrl={linkUrl}
          />
        </div>
      </div>
    </>
  );
}

export default BlogEditor;
