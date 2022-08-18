const { createClient } = require("redis");

async function storeData(image, data) {
  const client = createClient();
  await client.connect();
  await client.set(image, JSON.stringify(data));

  client.disconnect();
}

async function getMetaData(image) {
  const client = createClient();
  await client.connect();
  const data = await JSON.parse(await client.get(image));

  client.disconnect();

  return data;
}

module.exports = { storeData, getMetaData };
