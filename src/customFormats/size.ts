import Quill from 'quill';
import { ClassAttributor, Scope } from 'parchment';

// 建立自訂 class attributor，注意這裡的 className 是 'ql-size'
const CustomSize = new ClassAttributor('size', 'ql-size', {
  scope: Scope.INLINE,
  whitelist: ['Normal', 'txt-xxs', 'txt-xs', 'txt-l', 'txt-xl', 'txt-big']
});

// 註冊進 Quill
Quill.register(CustomSize, true);
export { CustomSize };