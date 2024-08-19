import { prisma } from '~/prisma/client';
import type { Channel, QueryResolvers } from './../../types.generated';

export const channels: NonNullable<QueryResolvers['channels']> = async (_parent, _arg, _ctx) => {
        const record = await prisma.channel.findMany()
        const ret: Channel[] = []

        record.forEach(val => {
                ret.push({
                        id: val.id,
                        name: val.name,
                        nonGulag: val.nonGulag,
                        status: "Success"
                })
        })

        return ret
}