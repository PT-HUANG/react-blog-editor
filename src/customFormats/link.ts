import Quill from "quill";

const Inline = Quill.import('blots/inline') as any;

class CustomLink extends Inline {
  static blotName = 'link';
  static tagName = 'A';
  static SANITIZED_URL = 'about:blank';
  static PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel', 'sms'];
  static create(value: any) {
    const node = super.create(value);
    node.setAttribute('id', "");
    node.setAttribute('pastr', "");
    node.setAttribute('href', this.sanitize(value));
    return node;
  }
  static formats(domNode: any) {
    return domNode.getAttribute('href');
  }
  static sanitize(url:string) {
    return sanitize(url, this.PROTOCOL_WHITELIST) ? url : this.SANITIZED_URL;
  }
  format(name: string, value: string) {
    if (name !== this.statics.blotName || !value) {
      super.format(name, value);
    } else {
      // @ts-expect-error
      this.domNode.setAttribute('href', this.constructor.sanitize(value));
    }
  }
}
function sanitize(url: string, protocols: any) {
  const anchor = document.createElement('a');
  anchor.href = url;
  const protocol = anchor.href.slice(0, anchor.href.indexOf(':'));
  return protocols.indexOf(protocol) > -1;
}
export { CustomLink as default, sanitize };
//# sourceMappingURL=link.js.map