// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ApolloServer } = require("apollo-server");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { makeAugmentedSchema } = require("@neo4j/graphql");

const typeDefs = `
type Movie {
    title: String
    year: Int
    imdbRating: Float
    genres: [Genre] @relationship(type: "IN_GENRE", direction: "OUT")
}

type Genre {
    name: String
    movies: [Movie] @relationship(type: "IN_GENRE", direction: "IN")
}
`;

const neoSchema = makeAugmentedSchema({ typeDefs });

const server = new ApolloServer({
    schema: neoSchema.schema,
    context: { driver: {} },
});

async function start() {
    const { url } = await server.listen();

    console.log(`🚀  Server ready at ${url}`);
}

function stop() {
    process.exit(0);
}

module.exports = { start, stop };
