const { createClient } = require("redis");
// require("dotenv").config({ path: "../.env" });

async function storeData(image, data) {
  const client = createClient({
    socket: {
      host: process.env.REDIS_HOSTNAME,
      port: process.env.REDIS_PORT,
    },
    password: process.env.REDIS_PASSWORD,
  });
  await client.connect();
  await client.set(image, JSON.stringify(data));

  client.disconnect();
}

async function getMetaData(image) {
  const client = createClient({
    socket: {
      host: process.env.REDIS_HOSTNAME,
      port: process.env.REDIS_PORT,
    },

    password: process.env.REDIS_PASSWORD,
  });
  await client.connect();
  const data = await JSON.parse(await client.get(image));

  client.disconnect();

  return data;
}

module.exports = { storeData, getMetaData };
