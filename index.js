const express = require("express");
// require("dotenv").config();
const web3Service = require("./service/web3.service");
const imageService = require("./service/image.service");
// const Telegraf = require('telegraf');
// const bot = new Telegraf(process.env.TELEGRAM_BOT);

const app = express();
const { PORT } = process.env || 8080;
const graphql = require("graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const { AttributesType, ImageType, MetaDataType } = require("./GrapgQLTypes");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getMetaData: {
      type: MetaDataType,
      args: {
        address: { type: GraphQLString },
        id: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        try {
          const data = await web3Service.getMetaData(args.address, args.id);
          const imageUrl = `https://ipfs.io/ipfs/${data.image.slice(7)}`;
          const imageMetadata = await imageService.getImageMetadata(imageUrl);
          const { width, height } = imageMetadata;

          let response = {
            name: data.name,
            description: data.description,
            image: {
              imageUrl,
              width,
              height,
            },
            externalUrl: data.external_url,
            attributes: data.attributes,
          };
          return response;
        } catch (e) {
          return { message: e.message, code: e.code };
        }
      },
    },
  },
});

//no mutations actually
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    setMetaData: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return "it works";
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
    formatError: (err) => {
      return { code: err.code, message: err.message };
    },
  })
);

// bot.command('start', ctx => {
//   console.log(ctx.from)
//   bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot.', {
//   })
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
