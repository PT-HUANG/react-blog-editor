import Quill from "quill";

const Font = Quill.import("formats/font") as any;
Font.whitelist = ["Arial", "Roboto", "NotoSansTC", "SourceSans3", "SansSerif"];

Quill.register(Font, true);
export { Font };