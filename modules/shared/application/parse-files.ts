import { NextApiRequest } from 'next';
import formidable from 'formidable';

const multiPartFormData = formidable({
  multiples: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB,
  keepExtensions: true,
});

export const parseFilesFromRequest = (req: NextApiRequest) =>
  new Promise<formidable.File[]>((resolve, reject) => {
    multiPartFormData.parse(req, (err, _fields, files) => {
      if (err) {
        const existMsg = typeof err?.message === 'string' && !!err?.message;
        let errorMsg = '';

        if (existMsg && err.message.includes('maxFileSize exceeded')) {
          errorMsg = `Max file size exceceeded. ${err.message || err}`;
        } else {
          errorMsg = `An error has occurred while parsing files. ${
            err.message || err
          }`;
        }

        reject(errorMsg);
      }

      const filesFormatParse = Array.from(Object.keys(files)).reduce(
        (acc: formidable.File[], key) => {
          const file = files[key];

          if (Array.isArray(file)) {
            Array.from(file).forEach(eachFile => acc.push(eachFile));
          } else {
            acc.push(file);
          }

          return acc;
        },
        []
      );

      resolve(filesFormatParse);
    });
  });
