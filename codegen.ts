import type { CodegenConfig } from '@graphql-codegen/cli'
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

const config: CodegenConfig = {
    schema: ["graphql/v1/schema.graphql"],
    generates: {
        "graphql/v1": defineConfig()
    },
}

export default config