import { ChatInputCommandInteraction, Guild, GuildMember, GuildMemberRoleManager, SlashCommandBuilder, User, } from "discord.js";
import { createUserIfNone } from "~/prisma/user";
import type { InteractionReplyOptions } from "discord.js";
import type { Command } from "./command";
import { prisma } from "~/prisma/client";

const setPassCommand = new SlashCommandBuilder()
    .setName("setpass")
    .setDescription("Creates a password to login through from the web")
    .addStringOption(builder => {
        builder.setName("password")
        builder.setDescription("Password")
        return builder
    })

async function setPassExecute (interaction: ChatInputCommandInteraction) {
    await createUserIfNone(interaction.member as GuildMember)
    
    const member = interaction.member as GuildMember

    try {
        (await prisma.user.update({
            where: {
                id: member.id
            },
            data: {
                password: interaction.options.data[0].value as string
            }
        }))

        const options: InteractionReplyOptions = {
            ephemeral: true,
            content: `Your password is ${interaction.options.data[0].value as string}`
        }

        interaction.reply(options)
    } catch (err) {
        interaction.reply(`Error setting password (u shud probably try again): ${err}`)
    }
}

const setPass: Command = {
    data: setPassCommand,
    execute: setPassExecute
}

export {
    setPass
}