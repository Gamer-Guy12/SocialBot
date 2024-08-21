import { pubsub } from '~/graphql/PubSub';
import type   { Message, SubscriptionResolvers } from './../../types.generated';
import { prisma } from '~/prisma/client';
import { v7 as uuidV7, v7 } from 'uuid'

export const onMessageSentInChannel: NonNullable<SubscriptionResolvers['onMessageSentInChannel']> = {
  subscribe: async (_parent, _arg, _ctx) => {
    const session = await prisma.session.findUnique({
      where: {
        id: _arg.session
      },
      include: {
        User: true
      }
    })

    const id = v7()

    pubsub.subscribe(`MESSAGE_SENT_${_arg.channel}`, (val) => {
      if ((val.onMessageSentInChannel as Message).channel?.nonGulag && session?.User.gulag) {
        return
      }

      else pubsub.publish(id, val)
    })

    return pubsub.asyncIterator([id])
  }
}