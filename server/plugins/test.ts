import { getVoiceConnections, VoiceConnection } from "@discordjs/voice";
import { Events, REST, Client, GatewayIntentBits } from "discord.js";
import { defineNuxtPlugin } from "nuxt/app";
import { bot } from "~/bot/bot";
import { setupCommands } from "~/bot/commands";
import { getChannel, getVoiceChannel } from "~/bot/utils";
import { connectVoice } from "~/bot/voice";
import { pubsub } from "~/graphql/PubSub";
import { setupLogging } from "~/logging/log";

export default defineNitroPlugin(nitroApp => {
    bot.on(Events.Error, err => {
        console.log(err.message)
    })

    bot.once(Events.ClientReady, readyBot => {
        console.log(`Bot ready: logged in as ${readyBot.user.tag}`)
    });

    bot.login(process.env.BOT_TOKEN).then(async () => {
        setupCommands()
        setupLogging();
    })
})