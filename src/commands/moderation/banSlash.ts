import { SlashCommandBuilder } from "@discordjs/builders";

export const banSlash = new SlashCommandBuilder()
    .setName("banSlash")
    .setDescription("Bans a user from the server.")
    .addUserOption((option) =>
        option.setName("user").setDescription("User to ban").setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("reason")
            .setDescription("Reason for ban")
            .setRequired(false)
    );
