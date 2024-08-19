import { ChatInputCommandInteraction, GuildMember, GuildMemberRoleManager, SlashCommandBuilder, User } from "discord.js";
import { giveCredits } from "~/prisma/credits";
import { createUserIfNone } from "~/prisma/user";
import type { Command } from "./command";
import { setRole } from "~/bot/roles";

const accreditCommand = new SlashCommandBuilder()
    .setName("accredit")
    .setDescription("Gives social credit to user")
    .addNumberOption(builder => {
        builder.setName("amount")
        builder.setDescription("Amount to accredit")
        return builder
    })
    .addUserOption(builder => {
        builder.setName("user")
        builder.setDescription("User to give credit to")
        return builder
    })

async function accreditExecute (interaction: ChatInputCommandInteraction) {
    await createUserIfNone(interaction.member as GuildMember)
    const roles = interaction.member?.roles as GuildMemberRoleManager
    if (!roles.cache.has(process.env.LEADER_ROLE as string)) {
        throw "You do not have the role necessary"
    }
    const member = interaction.guild?.members.cache.get(interaction.options.data[0].value as string)
    if (member === undefined) throw "Cannot give credits"
    await createUserIfNone(member as GuildMember)
    await giveCredits(member, interaction.options.data[1].value as number)
    const num = interaction.options.data[1].value as number
    await setRole(member as GuildMember)
    interaction.reply(`Gave ${num} credit${(num === 1) ? "" : ""} to ${member.displayName}`)
}

const accredit: Command = {
    data: accreditCommand,
    execute: accreditExecute
}

export {
    accredit
}