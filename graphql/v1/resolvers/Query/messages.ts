import { prisma } from '~/prisma/client';
import type { Message, QueryResolvers } from './../../types.generated';

export const messages: NonNullable<QueryResolvers['messages']> = async (_parent, _arg, _ctx) => {
        const locked = (process.env.GULAG_LOCKED as string).split(",")

        const session = await prisma.session.findUnique({
                where: {
                        id: _arg.session
                },
                include: {
                        User: true
                }
        })

        if (locked.includes(_arg.channel) && session?.User.gulag) {
                return [{
                        id: "",
                        content: "",
                        createdAt: "",
                        sender: {
                                id: "",
                                gulag: false,
                                name: "",
                                socialCredit: 0,
                                leader: false,
                                status: "Fail"
                        },
                        channel: {
                                id: "",
                                name: "",
                                nonGulag: false,
                                status: "Fail"
                        },
                        status: "Fail"
                }]
        }
        
        const record = await prisma.message.findMany({
                where: {
                        channelId: _arg.channel
                },
                include: {
                        User: true,
                        Channel: true
                }
        })
        const ret: Message[] = []

        record.forEach(val => {
                ret.push({
                        id: val.id,
                        content: val.content,
                        createdAt: val.createdAt.toUTCString(),
                        sender: {
                                id: val.User.id,
                                gulag: val.User.gulag,
                                name: val.User.name,
                                socialCredit: val.User.socialCredit,
                                leader: val.User.leader,
                                status: "Success"
                        },
                        channel: {
                                id: val.channelId,
                                name: val.Channel.id,
                                nonGulag: val.Channel.nonGulag,
                                status: "Success"
                        },
                        status: "Success"
                })
        })

        return ret
}