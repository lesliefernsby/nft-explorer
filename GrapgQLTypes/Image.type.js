const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const ImageType = new GraphQLObjectType({
  name: "Image",
  fields: () => ({
    imageUrl: { type: GraphQLString },
    width: { type: GraphQLInt },
    height: { type: GraphQLInt },
  }),
});

module.exports = { ImageType };
