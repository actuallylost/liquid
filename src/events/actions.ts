import * as Discord from "discord.js";

import { LiquidClient } from "../lib/Client";
import { MessageEmbed, TextChannel } from "discord.js";

export const actEvents = (client: LiquidClient) => {
    const logChannel = client.channels.cache.get("614904031743049734");

    if (!logChannel) {
        return;
    }

    client
        .on("guildBanAdd", (guildBan: Discord.GuildBan) => {
            const banEmbed = new MessageEmbed()
                .setTitle(`Member Banned ${guildBan.user.tag}`)
                .setColor("#A803A8")
                .addField("Member »", `${guildBan.user.username}`, true)
                .addField("ID »", `${guildBan.user.id}`, true)
                .setFooter(
                    `${guildBan.user.username}`,
                    guildBan.user.avatarURL() || undefined
                )
                .setTimestamp();

            (logChannel as TextChannel).send({ embeds: [banEmbed] });
        })
        .on("guildBanRemove", (guildBan: Discord.GuildBan) => {
            const unbanEmbed = new MessageEmbed()
                .setTitle(`Member Unbanned (${guildBan.user.tag})`)
                .setColor("#A803A8")
                .addField("Member »", `${guildBan.user.username}`, true)
                .addField("ID »", `${guildBan.user.id}`, true)
                .setFooter(
                    `${guildBan.user.username}`,
                    guildBan.user.avatarURL() || undefined
                )
                .setTimestamp();

            (logChannel as TextChannel).send({ embeds: [unbanEmbed] });
        });
};
