import { prisma } from '~/prisma/client';
import type { QueryResolvers, User } from './../../types.generated';

export const user: NonNullable<QueryResolvers['user']> = async (_parent, _arg, _ctx) => {
        const record = await prisma.user.findUniqueOrThrow({
                where: {
                        id: _arg.id
                }
        })

        return {
                id: record.id,
                name: record.name,
                gulag: record.gulag,
                leader: record.leader,
                socialCredit: record.socialCredit,
                status: "Success"
        }
}