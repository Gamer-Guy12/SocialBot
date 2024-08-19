import { pubsub } from '~/graphql/PubSub';
import type { Message, SubscriptionResolvers } from './../../types.generated';

export const onMessageSent: NonNullable<SubscriptionResolvers['onMessageSent']> = {
  subscribe: async (_parent, _arg, _ctx) => {
    return pubsub.asyncIterator(["MESSAGE_SENT"])
  }
}