import * as Discord from "discord.js";

import { ExtendedClient } from "../lib/Client";
import { MessageEmbed, TextChannel } from "discord.js";

export const actEvents = (client: ExtendedClient) => {
    const logChannel = client.channels.cache.get("817296242169741334");

    if (!logChannel) {
        return;
    }

    client
        .on("guildBanAdd", (guild: Discord.Guild, member) => {
            const banEmbed = new MessageEmbed()
                .setTitle(`Member Banned ${member.tag}`)
                .setColor("#A803A8")
                .addField("Member »", `${member.username}`, true)
                .addField("ID »", `${member.id}`, true)
                .setFooter(
                    `${member.username}`,
                    member.avatarURL() || undefined
                )
                .setTimestamp();

            return (logChannel as TextChannel).send(banEmbed);
        })
        .on("guildBanRemove", (guild: Discord.Guild, member) => {
            const unbanEmbed = new MessageEmbed()
                .setTitle(`Member Unbanned (${member.tag})`)
                .setColor("#A803A8")
                .addField("Member »", `${member.username}`, true)
                .addField("ID »", `${member.id}`, true)
                .setFooter(
                    `${member.username}`,
                    member.avatarURL() || undefined
                )
                .setTimestamp();

            return (logChannel as TextChannel).send(unbanEmbed);
        });
};
