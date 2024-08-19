import { type GuildMember, type Channel, TextChannel, type VoiceChannel, ChannelType as ChannelTipe, type ChannelWebhookCreateOptions, type WebhookMessageCreateOptions } from "discord.js";
import { prisma } from "./client";
import { ChannelType } from "@prisma/client";
import { arrayIncludes, getGuild } from "~/bot/utils";

async function checkForChannel(id: string): Promise<boolean> {

    const channel = await prisma.channel.findUnique({
        where: {
            id: id
        }
    })

    return channel ? true : false

}

async function createChannel(channel: Channel) {
    const locked = (process.env.GULAG_LOCKED as string).split(",")

    if (channel.type === ChannelTipe.GuildCategory) {
        return
    }
    
    if (channel.type === ChannelTipe.GuildText) {
        const createOptions: ChannelWebhookCreateOptions = {
            name: channel.id
        }

        await channel.createWebhook(createOptions)
    }

    await prisma.channel.create({
        data: {
            id: channel.id,
            name: (channel as TextChannel | VoiceChannel).name,
            nonGulag: locked.includes((channel as TextChannel | VoiceChannel).id),
            type: channel.type === ChannelTipe.GuildText ? ChannelType.Text : ChannelType.Voice
        }
    })
}

async function createChannelIfNone(channel: Channel) {
    if (await checkForChannel(channel.id)) return
    await createChannel(channel)
}

async function createAllChannels() {
    const guild = await getGuild()

    guild.channels.cache.forEach(channel => {
        createChannelIfNone(channel)
    })
}

export {
    createChannelIfNone,
    checkForChannel,
    createChannel,
    createAllChannels
}