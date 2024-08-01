import "dotenv/config.js"
import { Client, Events, GatewayIntentBits, MessagePayload, TextChannel } from "discord.js"

const client = new Client({
    intents: [
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildModeration,
    ]
})

client.on(Events.MessageCreate, message => {
    if (!process.env.LOGS_CHANNEL) return

    var channel = client.channels.cache.get(process.env.LOGS_CHANNEL)
    if (!channel?.isTextBased()) return

    channel = channel as TextChannel

    channel.send(`Sender: ${message.author.displayName}, Channel: ${(message.channel as TextChannel).name}, Message: ${message.content}`)
})

client.once(Events.ClientReady, readyClient => {
    console.log(`Bot ready: logged in as ${readyClient.user.tag}`)
})

client.login(process.env.BOT_TOKEN)