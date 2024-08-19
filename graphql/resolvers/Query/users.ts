import { prisma } from '~/prisma/client';
import type { QueryResolvers, User } from './../../types.generated';

export const users: NonNullable<QueryResolvers['users']> = async (_parent, _arg, _ctx) => {
        const record = await prisma.user.findMany()
        const ret: User[] = []

        record.forEach(val => {
                ret.push({
                        id: val.id,
                        name: val.name,
                        leader: val.leader,
                        gulag: val.gulag,
                        socialCredit: val.socialCredit,
                        status: "Success"
                })
        })

        return ret
}