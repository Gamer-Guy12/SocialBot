import { ChatInputCommandInteraction, SlashCommandBuilder, User, GuildMemberRoleManager, GuildMember } from "discord.js";
import { giveCredits } from "~/prisma/credits";
import { createUserIfNone } from "~/prisma/user";
import type { Command } from "./command";
import { setRole } from "~/bot/roles";

const discreditCommand = new SlashCommandBuilder()
    .setName("discredit")
    .setDescription("Removes social credit from user")
    .addNumberOption(builder => {
        builder.setName("amount")
        builder.setDescription("Amount to discredit")
        return builder
    })
    .addUserOption(builder => {
        builder.setName("user")
        builder.setDescription("User to give credit to")
        return builder
    })

async function discreditExecute (interaction: ChatInputCommandInteraction) {
    await createUserIfNone(interaction.member as GuildMember)
    const roles = interaction.member?.roles as GuildMemberRoleManager
    if (!roles.cache.has(process.env.LEADER_ROLE as string)) {
        throw "You do not have the role necessary"
    }
    const member = interaction.guild?.members.cache.get(interaction.options.data[0].value as string)
    if (member === undefined) throw "Cannot give credits"
    await createUserIfNone(member as GuildMember)
    await giveCredits(member, (interaction.options.data[1].value as number) * -1)
    const num = interaction.options.data[1].value as number
    await setRole(member as GuildMember)
    interaction.reply(`Removed ${num} credit${(num === 1) ? "" : ""} from ${member.displayName}`)
}

const discredit: Command = {
    data: discreditCommand,
    execute: discreditExecute
}

export {
    discredit
}