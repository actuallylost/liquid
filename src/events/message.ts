import { MessageEmbed, TextChannel } from "discord.js";

import { ExtendedClient } from "../lib/Client";

export const msgEvents = (client: ExtendedClient) => {
    const logChannel = client.channels.cache.get("614904031743049734");

    if (!logChannel) {
        return;
    }

    client
        .on("messageUpdate", (oldMessage, newMessage) => {
            if (!oldMessage.guild || !newMessage.guild) {
                return;
            }

            if (!oldMessage.author || !newMessage.author) {
                return;
            }

            if (oldMessage.content === newMessage.content) {
                return;
            }

            if (!oldMessage.content || !newMessage.content) {
                return;
            }

            if (oldMessage.author.bot) {
                return;
            }

            const editEmbed = new MessageEmbed()
                .setTitle(`Message Edited (User: ${oldMessage.author.id})`)
                .setColor("#A803A8")
                .addField("From »", oldMessage.content, true)
                .addField("To »", newMessage.content, true)
                .setFooter(
                    `${oldMessage.author.username}`,
                    oldMessage.author.avatarURL() || undefined
                )
                .setTimestamp();

            (logChannel as TextChannel).send({embeds: [editEmbed]});
            // return (logChannel as TextChannel).send(
            //    `\`[${newMessage.createdAt}]\` ${oldMessage.author.tag} (\`${oldMessage.author.id}\`) edited a message in **${oldMessage.channel}** \n **From »** \`${oldMessage.content}\` \n **To »** \`${newMessage.content}\``
            //);
        })
        .on("messageDelete", (message) => {
            if (!message.guild) {
                return;
            }

            if (!message.author) {
                return;
            }

            if (message.author.bot) {
                return;
            }

            (logChannel as TextChannel).send(
                `Message was deleted with content ${message.content}`
            );
        });

    // client.on("message", (message: Discord.Message) => {
    //     if (message.author.bot) {
    //         return;
    //     }

    //     if (!message.guild) {
    //         return;
    //     }

    //     const messageEmbed = new MessageEmbed()
    //         .setAuthor(`${message.author.tag} (${message.author.id})`)
    //         .addField("Message:", `\`${message.content}\``);

    //     return (logChannel as TextChannel).send(messageEmbed);

    //     // `\`[${message.createdAt.}]\` ${message.author.tag} (\`${message.author.id}\`) sent \`${message.content}\` in **${message.guild}** (\`${message.guild.id}\`)`
    // });
};
