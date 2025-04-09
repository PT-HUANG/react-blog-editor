import Quill from "quill";

const Embed = Quill.import('blots/embed') as any;

class CustomDivider extends Embed {
  static blotName = 'divider';
  static tagName = 'hr';
}
export default CustomDivider;