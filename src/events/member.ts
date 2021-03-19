import * as Discord from "discord.js";

import { ExtendedClient } from "../lib/Client";
import { MessageEmbed, TextChannel } from "discord.js";

export const memberEvents = (client: ExtendedClient) => {
    const logChannel = client.channels.cache.get("817296242169741334");

    if (!logChannel) {
        return;
    }

    client.on("guildMemberUpdate", (oldMember, newMember) => {
        if (oldMember.nickname != newMember.nickname) {
            const nicknameEmbed = new MessageEmbed()
                .setTitle(`Nickname Changed`)
                .setColor("#A803A8")
                .addField("Nickname Before »", `${oldMember.nickname}`)
                .addField("Nickname After »", `${newMember.nickname}`)
                .addField("ID »", `${oldMember.id}`)
                .setFooter(
                    `${newMember.user?.username}`,
                    newMember.user?.avatarURL() || undefined
                )
                .setTimestamp();

            return (logChannel as TextChannel).send(nicknameEmbed);
        } else {
            return;
        }
    });
};
