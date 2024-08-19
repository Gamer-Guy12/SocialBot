import { prisma } from '~/prisma/client';
import type { ChannelResolvers, Status } from './../types.generated';
import { ChannelType } from '@prisma/client';

export const Channel: ChannelResolvers = {
  messages: async (parent) => {
    const messages = (await prisma.message.findMany({
      where: {
        channelId: parent.id
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
  },
  type: async (parent) => {
    const channel = (await prisma.channel.findUnique({
      where: {
        id: parent.id
      }
    }))

    return channel?.type === ChannelType.Text ? "Text" : "Video"
  }
}
