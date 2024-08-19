import { prisma } from '~/prisma/client';
import type { UserResolvers } from './../types.generated';
import lodash from 'lodash'
import type { Status } from './../types.generated';

export const User: UserResolvers = {
  messages: async (parent) => {
    const messages = (await prisma.message.findMany({
      where: {
        senderId: parent.id
      }
    }))
    const processed = messages.map(val => {
      let temp: {content: string, id: string, createdAt: string, status: Status} = {
        content: val.content,
        id: val.id,
        createdAt: val.createdAt.toString(),
        status: "Success"
      }

      return temp
    })
    return processed
  }
};