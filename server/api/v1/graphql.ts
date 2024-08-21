import { ApolloServer, BaseContext } from '@apollo/server'
import { defineGraphqlWebSocket, startServerAndCreateH3Handler } from '@as-integrations/h3'
import { resolvers } from '~/graphql/v1/resolvers.generated'
import { typeDefs } from '~/graphql/v1/typeDefs.generated'
import { makeExecutableSchema } from '@graphql-tools/schema'

const schema = makeExecutableSchema({ typeDefs, resolvers })

const apollo = new ApolloServer<BaseContext>({
    schema
})

export default startServerAndCreateH3Handler(apollo, {
    websocket: defineGraphqlWebSocket({ schema })
})