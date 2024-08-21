import { prisma } from '~/prisma/client';
import type { MutationResolvers } from './../../types.generated';

export const login: NonNullable<MutationResolvers['login']> = async (_parent, _arg, _ctx) => {
        const user = await prisma.user.findUniqueOrThrow({
                where: {
                        password: _arg.password
                }
        })

        const session = await prisma.session.create({
                data: {
                        userId: user.id
                }
        })

        return {
                id: session.id,
                user: {
                        id: user.id,
                        name: user.name,
                        gulag: user.gulag,
                        leader: user.leader,
                        socialCredit: user.socialCredit,
                        status: "Success"
                },
                status: "Success"
        }
}