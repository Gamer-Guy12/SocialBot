import { prisma } from '~/prisma/client';
import type { Channel, MessageResolvers, User } from './../types.generated';

export const Message: MessageResolvers = {
  channel: async (parent) => {
    return {...(await prisma.channel.findUnique({
      where: {
          id: parent.channel?.id
      }
    })), status: "Success"} as Channel
  },
  sender: async (parent) => {
  return {...(await prisma.user.findUnique({
      where: {
          id: parent.sender?.id
      }
  })), status: "Success"} as User
  }
};