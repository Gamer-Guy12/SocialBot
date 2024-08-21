import { prisma } from '~/prisma/client';
import type { QueryResolvers } from './../../types.generated';

export const channel: NonNullable<QueryResolvers['channel']> = async (_parent, _arg, _ctx) => {
        const locked = (process.env.GULAG_LOCKED as string).split(",")

        const session = await prisma.session.findUnique({
                where: {
                        id: _arg.session
                },
                include: {
                        User: true
                }
        })

        if (locked.includes(_arg.id) && session?.User.gulag) {
                return {
                        status: "Fail",
                        id: "",
                        name: "",
                        nonGulag: true,
                        response: "This channel is locked to gulag people"
                }
        }

        const record = await prisma.channel.findUniqueOrThrow({
                where: {
                        id: _arg.id
                }
        })

        return {
                id: record.id,
                name: record.name,
                nonGulag: record.nonGulag,
                status: "Success"
        }
}