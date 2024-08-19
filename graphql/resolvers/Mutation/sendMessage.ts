import { checkForUser } from '~/prisma/user';
import type { MutationResolvers } from './../../types.generated';
import { prisma } from '~/prisma/client';
import { getChannel, idToDiscordUser } from '~/bot/utils';
import { ChannelType, type ChannelWebhookCreateOptions, type MessageCreateOptions, type MessagePayload, type MessagePayloadOption, type TextChannel, type WebhookMessageCreateOptions } from 'discord.js';
import { log, setupLogging } from '~/logging/log';

export const sendMessage: NonNullable<MutationResolvers['sendMessage']> = async (_parent, _arg, _ctx) => {
    if (!checkForUser(_arg.session)) {
        return {
            id: "",
            content: "",
            createdAt: "",
            status: "Fail",
            response: "No session exists"
        }
    }

    const session = (await prisma.session.findUniqueOrThrow({
        where: {
            id: _arg.session
        },
        include: {
            User: true
        }
    }));

    const message: MessageCreateOptions = {
        content: _arg.content
    };

    const channel = await getChannel(_arg.channel)

    if (channel.type !== ChannelType.GuildText) throw "Channel error"
    
    const createOptions: ChannelWebhookCreateOptions = {
        name: channel.id
    }

    const webhook = await (await channel.fetchWebhooks()).filter(value => value.name === channel.id).last()

    if (!webhook) throw "Webhook error"

    const wmes: WebhookMessageCreateOptions = {
        username: session.User.name,
        content: _arg.content
    }

    const logger = await webhook.send(wmes)
    //console.log(session.userId, "id")
    await log(logger, session.userId)

    const record = await prisma.message.findUniqueOrThrow({
        where: {
            id: logger.id
        },
        include: {
            User: true,
            Channel: true
        }
    });

    (await getChannel(process.env.LOGS_CHANNEL as string)).send(`Sender: ${session.User.name}, Channel: ${(logger.channel as TextChannel).name}, Message: ${logger.content}`)

    return {
        content: _arg.content,
        id: logger.id,
        createdAt: logger.createdAt.toUTCString(),
        sender: {
                id: record.User.id,
                gulag: record.User.gulag,
                name: record.User.name,
                socialCredit: record.User.socialCredit,
                leader: record.User.leader,
                status: "Success"
        },
        channel: {
                id: record.channelId,
                name: record.Channel.id,
                nonGulag: record.Channel.nonGulag,
                status: "Success"
        },
        status: "Success"
    }
}