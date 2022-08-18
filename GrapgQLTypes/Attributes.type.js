const { GraphQLString, GraphQLObjectType } = require("graphql");

const AttributesType = new GraphQLObjectType({
  name: "Attributes",
  fields: () => ({
    trait_type: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

module.exports = { AttributesType };
