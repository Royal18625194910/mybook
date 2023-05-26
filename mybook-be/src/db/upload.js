const fs = require('fs');

/**
 * 
 * 保存文件
 */
const saveFileToDisk = (ctx, filename) => {
  return new Promise((resolve, reject) => {
    const file = ctx.request.files.file;
    console.log(filename);
    const reader = fs.createReadStream(file.filepath);
    const writeStream = fs.createWriteStream(filename);

    reader.pipe(writeStream);

    reader.on('end', () => {
      resolve(filename);
    });

    reader.on('error', (err) => {
      reject(err);
    });
  });
}

const getUploadFileExt = (ctx) => {
  const { originalFilename = '' } = ctx.request.files.file;
  return originalFilename.split('.').pop();
};

module.exports = {
  saveFileToDisk,
  getUploadFileExt,
};
