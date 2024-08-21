import { prisma } from '~/prisma/client';
import type { Channel, QueryResolvers } from './../../types.generated';

export const channels: NonNullable<QueryResolvers['channels']> = async (_parent, _arg, _ctx) => {
        const record = await prisma.channel.findMany()
        const ret: Channel[] = []

        const locked = (process.env.GULAG_LOCKED as string).split(",")

        const session = await prisma.session.findUnique({
                where: {
                        id: _arg.session
                },
                include: {
                        User: true
                }
        })

        record.forEach(val => {
                ret.push({
                        id: val.id,
                        name: val.name,
                        nonGulag: val.nonGulag,
                        status: "Success"
                })
        })

        return ret.filter(val => {
                if (session?.User.gulag && val.nonGulag) {
                        return false
                }

                return true
        })
}