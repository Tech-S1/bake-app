import { Buffer } from "buffer";

const decodeImageUrl = (encodedString) => {
  var decoded = Buffer.from(encodedString, "base64").toString();
  var extension = undefined;
  var lowerCase = decoded.toLowerCase();
  if (lowerCase.indexOf("png") !== -1) extension = "png";
  else if (lowerCase.indexOf("jpg") !== -1 || lowerCase.indexOf("jpeg") !== -1)
    extension = "jpg";
  else extension = "tiff";

  return "data:image/" + extension + ";base64," + encodedString;
};

export default decodeImageUrl;
