export function blobToJson(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(blob, 'utf-8');
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => {
      reject(err);
    };
  });
}
