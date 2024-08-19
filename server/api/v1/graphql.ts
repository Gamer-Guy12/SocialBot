import { ApolloServer, BaseContext } from '@apollo/server'
import { defineGraphqlWebSocket, startServerAndCreateH3Handler } from '@as-integrations/h3'
import { resolvers } from '~/graphql/resolvers.generated'
import { typeDefs } from '~/graphql/typeDefs.generated'
import { makeExecutableSchema } from '@graphql-tools/schema'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const apollo = new ApolloServer<BaseContext>({
    schema
})

export default startServerAndCreateH3Handler(apollo, {
    websocket: defineGraphqlWebSocket({ schema })
})