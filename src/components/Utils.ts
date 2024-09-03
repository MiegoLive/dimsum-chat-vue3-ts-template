export function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function escapeHtml(str: string) {
  return str.replace(/[&<>"']/g, function(match) {
    switch (match) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#x27;';
      default:
        return match;
    }
  });
}

/*
export async function loadModule(urls: string[]) {
  for (const url of urls) {
    try {
      const module = await import(url);
      return module;
    } catch (error) {
      console.error(`Failed to load module from ${url}: ${error}`);
    }
  }
  throw new Error(`Failed to load module from any of the provided URLs: ${urls.join(', ')}`);
}

// 动态载入方式
const {onMessage, getBfaceURL} = await import('https://fastly.jsdelivr.net/npm/dimsum-chat@0/+esm');

// 多url的动态载入方式，提高资源命中率，但是会造成 vite 调试卡顿
import { loadModule } from "./Utils";
const { onMessage, getBfaceURL } = (await loadModule([
  "https://fastly.jsdelivr.net/npm/dimsum-chat@0/+esm",
  "https://cdn.jsdelivr.net/npm/dimsum-chat@0/+esm",
  "/utils/dimsum-chat/dimsum-chat.js",
])) as typeof import("dimsum-chat");
*/