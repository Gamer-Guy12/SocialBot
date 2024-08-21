import { prisma } from '~/prisma/client';
import type { QueryResolvers } from './../../types.generated';

export const message: NonNullable<QueryResolvers['message']> = async (_parent, _arg, _ctx) => {
        const record = await prisma.message.findUniqueOrThrow({
                where: {
                        id: _arg.id
                },
                include: {
                        User: true,
                        Channel: true
                }
        })

        return {
                id: record.id,
                content: record.content,
                createdAt: record.createdAt.toUTCString(),
                sender: {
                        id: record.User.id,
                        gulag: record.User.gulag,
                        name: record.User.name,
                        socialCredit: record.User.socialCredit,
                        leader: record.User.leader,
                        status: "Success"
                },
                channel: {
                        id: record.channelId,
                        name: record.Channel.id,
                        nonGulag: record.Channel.nonGulag,
                        status: "Success"
                },
                status: "Success"
        }
}