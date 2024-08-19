import { ChatInputCommandInteraction, Guild, GuildMember, GuildMemberRoleManager, SlashCommandBuilder, User } from "discord.js";
import { clearCredits as clear } from "~/prisma/credits";
import { createUserIfNone } from "~/prisma/user";
import type { Command } from "./command";
import { updateAllRoles } from "~/bot/roles";

const clearCreditsCommand = new SlashCommandBuilder()
    .setName("clearcredits")
    .setDescription("Clears all credits")

async function clearCreditsExecute (interaction: ChatInputCommandInteraction) {
    await createUserIfNone(interaction.member as GuildMember)
    const roles = interaction.member?.roles as GuildMemberRoleManager
    if (!roles.cache.has(process.env.LEADER_ROLE as string)) {
        throw "You do not have the role necessary"
    }
    await clear()
    await updateAllRoles()
    interaction.reply(`Cleared all credits`)
}

const clearCredits: Command = {
    data: clearCreditsCommand,
    execute: clearCreditsExecute
}

export {
    clearCredits
}