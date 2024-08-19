/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { allMessages as Query_allMessages } from './resolvers/Query/allMessages';
import    { channel as Query_channel } from './resolvers/Query/channel';
import    { channels as Query_channels } from './resolvers/Query/channels';
import    { message as Query_message } from './resolvers/Query/message';
import    { messages as Query_messages } from './resolvers/Query/messages';
import    { user as Query_user } from './resolvers/Query/user';
import    { users as Query_users } from './resolvers/Query/users';
import    { login as Mutation_login } from './resolvers/Mutation/login';
import    { sendMessage as Mutation_sendMessage } from './resolvers/Mutation/sendMessage';
import    { onMessageSent as Subscription_onMessageSent } from './resolvers/Subscription/onMessageSent';
import    { onMessageSentInChannel as Subscription_onMessageSentInChannel } from './resolvers/Subscription/onMessageSentInChannel';
import    { Channel } from './resolvers/Channel';
import    { Message } from './resolvers/Message';
import    { Session } from './resolvers/Session';
import    { User } from './resolvers/User';
    export const resolvers: Resolvers = {
      Query: { allMessages: Query_allMessages,channel: Query_channel,channels: Query_channels,message: Query_message,messages: Query_messages,user: Query_user,users: Query_users },
      Mutation: { login: Mutation_login,sendMessage: Mutation_sendMessage },
      Subscription: { onMessageSent: Subscription_onMessageSent,onMessageSentInChannel: Subscription_onMessageSentInChannel },
      Channel: Channel,
Message: Message,
Session: Session,
User: User
    }