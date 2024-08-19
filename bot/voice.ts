import { entersState, getVoiceConnections, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import type { VoiceChannel } from "discord.js";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { v4 as uuidV4 } from 'uuid'
import { getVoiceChannel } from "./utils";

async function connectVoice(channel: string, temp: Client) {

    console.log("again")

    temp.on(Events.Error, err => {
        console.log("Voice:", err.message)
    })
    
    temp.once(Events.ClientReady, async readyBot => {
        console.log(`Voice bot ${temp}`)

        let get = await getVoiceChannel(channel, temp)
    
        let connection = joinVoiceChannel({
            channelId: get.id,
            guildId: process.env.SERVER_ID as string,
            adapterCreator: get.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false,
        })
    
        connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5_000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5_000),
                ]);
                // Seems to be reconnecting to a new channel - ignore disconnect
            } catch (error) {
                // Seems to be a real disconnect which SHOULDN'T be recovered from
                connection.destroy();
            }
        });
    
        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log("Joined voice channel")
            
            setTimeout(() => {
                connection.destroy()
                temp.destroy()
            }, 60000)
        })
    });
    
    temp.login(process.env.BOT_TOKEN)

    // return {
    //     connection: connection,
    //     client: temp
    // }
}

export {
    connectVoice
}