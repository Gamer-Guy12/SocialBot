import { ChatInputCommandInteraction, Guild, GuildMember, GuildMemberRoleManager, SlashCommandBuilder, User } from "discord.js";
import { giveCredits, getCredits } from "~/prisma/credits";
import { createUserIfNone } from "~/prisma/user";
import type { Command } from "./command";
import { setRole } from "~/bot/roles";

const transferCreditsCommand = new SlashCommandBuilder()
    .setName("transfercredits")
    .setDescription("Transfers social credits from you to somone")
    .addNumberOption(builder => {
        builder.setName("amount")
        builder.setDescription("Amount to transfer")
        return builder
    })
    .addUserOption(builder => {
        builder.setName("user")
        builder.setDescription("User to give credit to")
        return builder
    })

async function transferCreditsExecute (interaction: ChatInputCommandInteraction) {
    await createUserIfNone(interaction.member as GuildMember)
    const member = interaction.guild?.members.cache.get(interaction.options.data[0].value as string)
    const user = member?.user
    if (user === undefined || member === undefined) throw "Cannot give credits"
    await createUserIfNone(member as GuildMember)
    
    const start = await getCredits(interaction.member as GuildMember)

    if (!interaction.options.data[1].value) throw "Can't transfer credits"

    if (start < (interaction.options.data[1].value as number)) throw "Not enough credits to transfer"

    await giveCredits(member, interaction.options.data[1].value as number)
    await giveCredits(interaction.member as GuildMember, (interaction.options.data[1].value as number) * -1)

    await setRole(member as GuildMember)
    await setRole(interaction.member as GuildMember)
    interaction.reply(``)
}

const transferCredits: Command = {
    data: transferCreditsCommand,
    execute: transferCreditsExecute
}

export {
    transferCredits
}