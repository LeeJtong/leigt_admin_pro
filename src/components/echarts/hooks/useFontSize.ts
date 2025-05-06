import useAppStore from "@/store/modules/app";

const device = useAppStore().device
export const translateFont = (size: number): number => {
  // 获得当前页面宽度大小
  let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  if (!clientWidth) return size
  // let fontSize = clientWidth / 2560; // 2560 为字体大小显示为 size 时的页面宽度
  // let fontSize = clientWidth / 800; // 800 为字体大小显示为 size 时的页面宽度
  let fontSize = device === 'mobile' ? clientWidth / 800 : clientWidth / 1920; // 2560 为字体大小显示为 size 时的页面宽度
  return size * fontSize;
}
