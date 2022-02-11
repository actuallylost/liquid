import { MessageEmbed, ReactionUserManager } from "discord.js";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class info extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "info",
            guildOnly: true,
            description: "Provides information about a user.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        const map: Record<string, string> = {
            DISCORD_EMPLOYEE: "Discord Employee",
            PARTNERED_SERVER_OWNER: "Discord Partner",
            HYPESQUAD_EVENTS: "Hypesquad Events",
            BUGHUNTER_LEVEL_1: "Bug Hunter",
            HOUSE_BRAVERY: "House of Bravery",
            HOUSE_BRILLIANCE: "House of Brilliance",
            HOUSE_BALANCE: "House of Balance",
            EARLY_SUPPORTER: "Early Supporter",
            TEAM_USER: "???",
            SYSTEM: "Clyde",
            BUGHUNTER_LEVEL_2: "Bug Squasher",
            VERIFIED_BOT: "Verified Bot",
            EARLY_VERIFIED_BOT_DEVELOPER: "Verified Bot Developer",
        };

        if (!message.author.flags) {
            return;
        }
        if (!message.member.joinedAt) {
            return;
        }

        const serialized: Record<
            string,
            boolean
        > = message.author.flags.serialize();

        const stringified = Object.keys(serialized)
            .filter((k) => serialized[k])
            .map((v) => map[v])
            .join(", ");

        const infoEmbed = new MessageEmbed()
            .setTitle("User Information")
            .setThumbnail(message.author.avatarURL() || "None")
            .setColor("#4de8e8")
            .addField("User:", message.author.tag)
            .addField("ID:", message.author.id)
            .addField(
                "Roles:",
                message.member?.roles.cache
                    .map((r) => `<@&${r.id}>`)
                    .join(", ") || "None"
            )
            .addField("Badges:", stringified)
            .addField("Created at:", message.author.createdAt.toString())
            .addField("Joined at", message.member.joinedAt.toString())
            .setFooter(
                `Requested by ${message.author.tag}`,
                message.author.avatarURL() || undefined
            )
            .setTimestamp();
        return message.reply({ embeds: [infoEmbed] });
    }
}
