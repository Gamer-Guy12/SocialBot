import { prisma } from '~/prisma/client';
import type { SessionResolvers, User } from './../types.generated';

export const Session: SessionResolvers = {
  user: async (parent) => {
    return {...(await prisma.user.findUnique({
      where: {
        id: parent.user?.id
      }
    }) ),
    status: "Success"
    } as User
  }
};