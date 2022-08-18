const sharp = require("sharp");
const axios = require("axios");
const imageRepository = require("../repository/image.repository");

async function getImageMetadata(imageUrl) {
  const storedMetaData = await imageRepository.getMetaData(imageUrl);

  if (storedMetaData !== null) return storedMetaData;

  const input = (await axios({ url: imageUrl, responseType: "arraybuffer" }))
    .data;

  const metadata = await sharp(input).metadata();
  imageRepository.storeData(imageUrl, metadata);

  return metadata;
}

module.exports = { getImageMetadata };
