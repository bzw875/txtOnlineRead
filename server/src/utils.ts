import chardet from 'chardet';
import * as iconv from 'iconv-lite';

// 判断编码并转为 UTF-8 字符串
export const convertToUtf8 = (buffer: Buffer): [boolean, string] => {
  try {
    const detectedEncoding = chardet.detect(buffer);
    const newStr = iconv.decode(buffer, detectedEncoding || 'GB18030');
    console.log(detectedEncoding);
    return [detectedEncoding !== 'UTF-8', newStr];
  } catch (err) {
    console.error('读取或转换文件时出错:', err.slice(0, 100));
    return [false, ''];
  }
};

export const pageSize = 5000;
