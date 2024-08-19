import { prisma } from '~/prisma/client';
import type { Message, QueryResolvers } from './../../types.generated';

export const allMessages: NonNullable<QueryResolvers['allMessages']> = async (_parent, _arg, _ctx) => {
        const record = await prisma.message.findMany({
                include: {
                        Channel: true
                }
        })

        const locked = (process.env.GULAG_LOCKED as string).split(",")

        const session = await prisma.session.findUnique({
                where: {
                        id: _arg.session
                },
                include: {
                        User: true
                }
        })

        record.filter(val => {
                if (locked.includes(val.channelId) && session?.User.gulag) {
                        return false
                }

                return true
        })

        const ret: Message[] = record.map(val => {
                return {
                        id: val.id,
                        status: "Success",
                        content: val.content,
                        createdAt: val.createdAt.toUTCString()
                }
        })

        return ret
}