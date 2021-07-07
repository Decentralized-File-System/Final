export const bytesToSize = (bytes: string) => {
  if (bytes.length === 0) return "0 Byte";
  if (bytes.length > 0 && bytes.length < 4) return `${bytes} Bytes`;
  let number;
  if (bytes.length > 3 && bytes.length < 7) {
    switch (bytes.length) {
      case 4:
        number = bytes.slice(0, 1) + "." + bytes.slice(1, 2) + " KB";
        break;

      case 5:
        number = bytes.slice(0, 2) + "." + bytes.slice(2, 3) + " KB";
        break;

      case 6:
        number = bytes.slice(0, 3) + "." + bytes.slice(3, 4) + " KB";
        break;
    }
  } else if (bytes.length > 6 && bytes.length < 10) {
    switch (bytes.length) {
      case 7:
        number = bytes.slice(0, 1) + "." + bytes.slice(1, 2) + " MB";
        break;

      case 8:
        number = bytes.slice(0, 2) + "." + bytes.slice(2, 3) + " MB";
        break;

      case 9:
        number = bytes.slice(0, 3) + "." + bytes.slice(3, 4) + " MB";
        break;
    }
  } else if (bytes.length > 9 && bytes.length < 13) {
    switch (bytes.length) {
      case 10:
        number = bytes.slice(0, 1) + "." + bytes.slice(1, 2) + " GB";
        break;

      case 11:
        number = bytes.slice(0, 2) + "." + bytes.slice(2, 3) + " GB";
        break;

      case 12:
        number = bytes.slice(0, 3) + "." + bytes.slice(3, 4) + " GB";
        break;
    }
  }
  return number;
};


export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}