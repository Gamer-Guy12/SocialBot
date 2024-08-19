import { REST, Routes, Collection, Events } from "discord.js";
import { accredit } from "~/commands/accredit";
import type { Command } from "~/commands/command";
import { discredit } from "~/commands/discredit";
import { setPass } from "~/commands/setpass";
import { transferCredits } from "~/commands/transfercredits";
import { clearCredits } from "~/commands/clearcredits";
import { getCredits } from "~/commands/getcredits";
import { bot } from "./bot";

const commands = new Collection<string, Command>()
const serverCommands: object[] = []

async function setupCommands() {

    commands.set("accredit", accredit)
    serverCommands.push(accredit.data.toJSON())
    commands.set("discredit", discredit)
    serverCommands.push(discredit.data.toJSON())
    commands.set("clearcredits", clearCredits)
    serverCommands.push(clearCredits.data.toJSON())
    commands.set("getcredits", getCredits)
    serverCommands.push(getCredits.data.toJSON())
    commands.set("transfercredits", transferCredits)
    serverCommands.push(transferCredits.data.toJSON())
    commands.set("setpass", setPass)
    serverCommands.push(setPass.data.toJSON())

    bot.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
        const command = commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });
    
    const rest = new REST().setToken(process.env.BOT_TOKEN as string);

    (async () => {
        try {
            console.log(`Started refreshing ${commands.size} application (/) commands`)
            
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.SERVER_ID as string),
                { body: serverCommands }
            )
    
            console.log(`Successfully loaded ${commands.size} application (/) commands`)
        } catch (err) {
            console.error(err)
        }
    })()

}

export {
    setupCommands
}