import { Events, TextChannel, type ChannelWebhookCreateOptions, type Message } from "discord.js";
import { bot } from "~/bot/bot";
import { updateAllRoles } from "~/bot/roles";
import { idToDiscordUser } from "~/bot/utils";
import { pubsub } from "~/graphql/PubSub";
import { onMessageSent } from "~/graphql/resolvers/Subscription/onMessageSent";
import type { onMessageSentInChannel } from "~/graphql/resolvers/Subscription/onMessageSentInChannel";
import { createAllChannels } from "~/prisma/channel";
import { prisma } from "~/prisma/client";
import { createUserIfNone } from "~/prisma/user";

async function setupLogging() {

    bot.on(Events.MessageCreate, async message => {
        await updateAllRoles()
        await createAllChannels()
        if (message.author.id === bot.user?.id) return
    
        let channel = bot.channels.cache.get(process.env.LOGS_CHANNEL as string)
        if (!channel?.isTextBased()) return
        
        channel = channel as TextChannel
        const options: ChannelWebhookCreateOptions = {
            name: channel.id
        }
        await log(message)
        channel.send(`Sender: ${message.author.displayName}, Channel: ${(message.channel as TextChannel).name}, Message: ${message.content}`)
    })

}

async function log(message: Message, id?: string) {
    if (id) {
        await createUserIfNone(await idToDiscordUser(id))
    }
    else {
        await createUserIfNone(await idToDiscordUser(message.author.id))
    }

    const record = await prisma.message.create({
        data: {
            id: message.id,
            content: message.content,
            createdAt: new Date(Date.now()),
            senderId: id ? id : message.author.id,
            channelId: message.channelId
        },
        include: {
            User: true,
            Channel: true
        }
    })

    pubsub.publish("MESSAGE_SENT", {onMessageSent: {
        id: record.id,
        content: record.content,
        createdAt: record.createdAt.toUTCString(),
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
    }})

    pubsub.publish(`MESSAGE_SENT_${record.channelId}`, {onMessageSentInChannel: {
        id: record.id,
        content: record.content,
        createdAt: record.createdAt.toUTCString(),
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
    }})
}

export {
    log,
    setupLogging
}