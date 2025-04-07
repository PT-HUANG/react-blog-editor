import Quill from "quill";

const Block = Quill.import('blots/block') as any;

class divider extends Block {
  static blotName = 'divider';
  static tagName = 'hr';
}

export default divider;