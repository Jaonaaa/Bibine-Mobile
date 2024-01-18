import Resizer from "react-image-file-resizer";

export async function getBase64(file: Blob) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = function () {
      let base64 = (reader.result + "").split(",")[1];
      resolve(base64);
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
}

export const resizeFile = async (file: Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        let base64 = (uri + "").split(",")[1];
        resolve(base64);
      },
      "base64"
    );
  });
