function normalizeMime(input: string) {
  if (input === "image/jpg") return "image/jpeg";
  return input;
}

function loadImage(uri: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.src = uri;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise(resolve => {
    canvas.toBlob(resolve, type, quality);
  });
}

function parseDataUri(dataUri: string) {
  const [, mime, , data] = dataUri.match(new RegExp(/data:([\w\/]+)(;base64)?,(.*)/));
  return { mime, data };
}

function binaryStringToByteArray(input: string) {
  const bytes = [];

  for (let i = 0; i < input.length; i++) {
    bytes.push(input.charCodeAt(i));
  }

  return new Uint8Array(bytes);
}

async function convertImage(dataUri: string, _to: string) {
  const { mime, data } = parseDataUri(dataUri);
  const to = normalizeMime(_to);
  if (mime === to) {
    return new Blob([binaryStringToByteArray(atob(data))], { type: mime });
  }

  const image = await loadImage(dataUri);

  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  return await canvasToBlob(canvas, _to, 0.5);
}

export async function convertDataUriToFile(dataUri, to, name) {
  return new File([await convertImage(dataUri, to)], name, { type: normalizeMime(to) });
}
