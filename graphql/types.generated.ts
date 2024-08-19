import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String']['output'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String']['output'];
  nonGulag: Scalars['Boolean']['output'];
  response?: Maybe<Scalars['String']['output']>;
  status: Status;
  type?: Maybe<ChannelType>;
};

export type ChannelType =
  | 'Text'
  | 'Video';

export type Message = {
  __typename?: 'Message';
  channel?: Maybe<Channel>;
  content: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  id: Scalars['String']['output'];
  response?: Maybe<Scalars['String']['output']>;
  sender?: Maybe<User>;
  status: Status;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: Session;
  sendMessage: Message;
};


export type MutationloginArgs = {
  password: Scalars['String']['input'];
};


export type MutationsendMessageArgs = {
  channel: Scalars['String']['input'];
  content: Scalars['String']['input'];
  session: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  allMessages: Array<Message>;
  channel: Channel;
  channels: Array<Channel>;
  message: Message;
  messages: Array<Message>;
  user: User;
  users: Array<User>;
};


export type QueryallMessagesArgs = {
  session: Scalars['String']['input'];
};


export type QuerychannelArgs = {
  id: Scalars['String']['input'];
  session: Scalars['String']['input'];
};


export type QuerymessageArgs = {
  id: Scalars['String']['input'];
};


export type QuerymessagesArgs = {
  channel: Scalars['String']['input'];
  session: Scalars['String']['input'];
};


export type QueryuserArgs = {
  id: Scalars['String']['input'];
};

export type Session = {
  __typename?: 'Session';
  id: Scalars['String']['output'];
  response?: Maybe<Scalars['String']['output']>;
  status: Status;
  user?: Maybe<User>;
};

export type Status =
  | 'Fail'
  | 'Success';

export type Subscription = {
  __typename?: 'Subscription';
  onMessageSent: Message;
  onMessageSentInChannel: Message;
};


export type SubscriptiononMessageSentInChannelArgs = {
  channel: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  gulag: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  leader: Scalars['Boolean']['output'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String']['output'];
  response?: Maybe<Scalars['String']['output']>;
  socialCredit: Scalars['Int']['output'];
  status: Status;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Channel: ResolverTypeWrapper<Omit<Channel, 'messages' | 'status' | 'type'> & { messages?: Maybe<Array<ResolversTypes['Message']>>, status: ResolversTypes['Status'], type?: Maybe<ResolversTypes['ChannelType']> }>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ChannelType: ResolverTypeWrapper<'Text' | 'Video'>;
  Message: ResolverTypeWrapper<Omit<Message, 'channel' | 'sender' | 'status'> & { channel?: Maybe<ResolversTypes['Channel']>, sender?: Maybe<ResolversTypes['User']>, status: ResolversTypes['Status'] }>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Session: ResolverTypeWrapper<Omit<Session, 'status' | 'user'> & { status: ResolversTypes['Status'], user?: Maybe<ResolversTypes['User']> }>;
  Status: ResolverTypeWrapper<'Success' | 'Fail'>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<Omit<User, 'messages' | 'status'> & { messages?: Maybe<Array<ResolversTypes['Message']>>, status: ResolversTypes['Status'] }>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Channel: Omit<Channel, 'messages'> & { messages?: Maybe<Array<ResolversParentTypes['Message']>> };
  String: Scalars['String']['output'];
  Boolean: Scalars['Boolean']['output'];
  Message: Omit<Message, 'channel' | 'sender'> & { channel?: Maybe<ResolversParentTypes['Channel']>, sender?: Maybe<ResolversParentTypes['User']> };
  Mutation: {};
  Query: {};
  Session: Omit<Session, 'user'> & { user?: Maybe<ResolversParentTypes['User']> };
  Subscription: {};
  User: Omit<User, 'messages'> & { messages?: Maybe<Array<ResolversParentTypes['Message']>> };
  Int: Scalars['Int']['output'];
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nonGulag?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ChannelType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChannelTypeResolvers = EnumResolverSignature<{ Text?: any, Video?: any }, ResolversTypes['ChannelType']>;

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  login?: Resolver<ResolversTypes['Session'], ParentType, ContextType, RequireFields<MutationloginArgs, 'password'>>;
  sendMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationsendMessageArgs, 'channel' | 'content' | 'session'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allMessages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QueryallMessagesArgs, 'session'>>;
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<QuerychannelArgs, 'id' | 'session'>>;
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<QuerymessageArgs, 'id'>>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<QuerymessagesArgs, 'channel' | 'session'>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryuserArgs, 'id'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StatusResolvers = EnumResolverSignature<{ Fail?: any, Success?: any }, ResolversTypes['Status']>;

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  onMessageSent?: SubscriptionResolver<ResolversTypes['Message'], "onMessageSent", ParentType, ContextType>;
  onMessageSentInChannel?: SubscriptionResolver<ResolversTypes['Message'], "onMessageSentInChannel", ParentType, ContextType, RequireFields<SubscriptiononMessageSentInChannelArgs, 'channel'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  gulag?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  leader?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  response?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socialCredit?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Status'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Channel?: ChannelResolvers<ContextType>;
  ChannelType?: ChannelTypeResolvers;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  Status?: StatusResolvers;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

