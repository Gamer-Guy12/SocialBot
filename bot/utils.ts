import type { ChannelResolvable, Client, FetchMemberOptions, FetchMembersOptions, Guild, GuildMember, TextChannel, VoiceChannel } from "discord.js";
import { prisma } from "~/prisma/client";
import { bot } from "./bot";

async function discordUserToPrisma(user: GuildMember) {
    return prisma.user.findUniqueOrThrow({
        where: {
            id: user.id
        }
    })
}

async function idToDiscordUser(id: string): Promise<GuildMember> {
    const all = (bot.guilds.cache.get(process.env.SERVER_ID as string) as Guild).members.fetch()
    let ret;
    ;(await all).forEach(val => {
        if (val.id === id) ret = val
    })

    if (!ret) throw "User not found"

    return ret
}

async function getGuild(client?: Client): Promise<Guild> {
    if (client) {
        return await client.guilds.fetch(process.env.SERVER_ID as string)
    }

    return await bot.guilds.fetch(process.env.SERVER_ID as string)
}

function arrayIncludes<T>(array: T[], value: T): boolean {
    array.forEach(val => {
        if (value === val) return true
    })

    return false
}

async function getChannel(channel: string): Promise<TextChannel> {
    return (await (await getGuild()).channels.fetch(channel) as TextChannel)
}

async function getVoiceChannel(channel: string, client?: Client): Promise<VoiceChannel> {
    return (await (await getGuild(client ? client : undefined)).channels.fetch(channel) as VoiceChannel)
}

export {
    discordUserToPrisma,
    idToDiscordUser,
    getGuild,
    arrayIncludes,
    getChannel,
    getVoiceChannel
}