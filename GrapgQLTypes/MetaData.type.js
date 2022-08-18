const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const { ImageType } = require("./Image.type");
const { AttributesType } = require("./Attributes.type");

const MetaDataType = new GraphQLObjectType({
  name: "MetaData",
  fields: () => ({
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: ImageType },
    rights: { type: GraphQLString },
    location: { type: GraphQLString },
    camera: { type: GraphQLString },
    genre: { type: GraphQLString },
    time: { type: GraphQLString },
    artist: { type: GraphQLString },
    edition: { type: GraphQLString },
    externalUrl: { type: GraphQLString },
    attributes: { type: new GraphQLList(AttributesType) },
  }),
});

module.exports = { MetaDataType };
