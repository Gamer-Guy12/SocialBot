import { ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, SlashCommandBuilder, User } from "discord.js";
import { getCredits as get } from "~/prisma/credits";
import { createUserIfNone } from "~/prisma/user";
import type { Command } from "./command";
import { setRole } from "~/bot/roles";

const getCreditsCommand = new SlashCommandBuilder()
    .setName("getcredits")
    .setDescription("Shows how many credits a user has")
    .addUserOption(builder => {
        builder.setName("user")
        builder.setDescription("Who's credits to check")
        return builder
    })

async function getCreditsExecute (interaction: ChatInputCommandInteraction) {
    await createUserIfNone(interaction.member as GuildMember)
    const member = interaction.guild?.members.cache.get(interaction.options.data[0].value as string)
    const user = member?.user
    if (user === undefined || member === undefined) throw "Cannot get credits"
    await createUserIfNone(member)
    const amount = await get(member)
    interaction.reply(`${user.displayName} has ${amount} credit${(amount === 1) ? "" : ""}`)
}

const getCredits: Command = {
    data: getCreditsCommand,
    execute: getCreditsExecute
}

export {
    getCredits
}