import chardet from 'chardet';
import * as iconv from 'iconv-lite';

// 判断编码并转为 UTF-8 字符串
export const convertToUtf8 = (buffer: Buffer) => {
  try {
    const detectedEncoding = chardet.detect(buffer);
    return iconv.decode(buffer, detectedEncoding || 'GB18030');
  } catch (err) {
    console.error('读取或转换文件时出错:', err);
    return '';
  }
};
