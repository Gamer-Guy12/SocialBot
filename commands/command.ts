import type { SlashCommandOptionsOnlyBuilder } from "discord.js";
import type { ChatInputCommandInteraction } from "discord.js";

export interface Command {
    data: SlashCommandOptionsOnlyBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}