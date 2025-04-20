import Quill from "quill";
const Video = Quill.import('formats/video') as any;

class CustomVideo extends Video {
    static formats(domNode: any) {
        const formats = super.formats(domNode);
        if (domNode.hasAttribute('width')) {
          formats.width = domNode.getAttribute('width');
        }
        if (domNode.hasAttribute('height')) {
          formats.height = domNode.getAttribute('height');
        }
        return formats;
      }

    html() {
        const { width, height } = this.formats();
        const url = this.value().video;
        const start = url.lastIndexOf("/") + 1;
        const end = url.indexOf("?", start); // 有 query 的情況
        const videoId = end !== -1 ? url.slice(start, end) : url.slice(start);
        return `<div class="video-container">
                    <iframe 
                        width="${width || 800}"
                        height="${height || 450}"
                        src="${url}&mute=1&autoplay=1&loop=1&playlist=${videoId}"
                        title="YouTube video player" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                </div>`;
    }
}

export default CustomVideo;