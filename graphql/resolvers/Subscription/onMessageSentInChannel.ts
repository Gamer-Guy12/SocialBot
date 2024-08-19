import { pubsub } from '~/graphql/PubSub';
import type   { SubscriptionResolvers } from './../../types.generated';

export const onMessageSentInChannel: NonNullable<SubscriptionResolvers['onMessageSentInChannel']> = {
  subscribe: async (_parent, _arg, _ctx) => {
    return pubsub.asyncIterator([`MESSAGE_SENT_${_arg.channel}`])
  }
}