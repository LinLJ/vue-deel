export function blobFileDownload(file) {
  let blob = new Blob([file.data]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = decodeURI(file.headers['content-disposition']).split('filename=')[1];
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
