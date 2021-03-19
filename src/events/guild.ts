import * as Discord from "discord.js";

import { ExtendedClient } from "../lib/Client";
import { MessageEmbed, TextChannel } from "discord.js";

export const guildEvents = (client: ExtendedClient) => {
    const logChannel = client.channels.cache.get("817296242169741334");

    if (!logChannel) {
        return;
    }

    client
        .on("guildMemberAdd", (member) => {
            if (!member.user) {
                return;
            }

            const welcEmbed = new MessageEmbed()
                .setTitle(`Member Joined`)
                .setColor("#A803A8")
                .addField("Member »", `${member.user.username}`, true)
                .addField("ID »", `${member.user.id}`, true)
                .setFooter(
                    `${member.user.username}`,
                    member.user.avatarURL() || undefined
                )
                .setTimestamp();

            return (logChannel as TextChannel).send(welcEmbed);
        })
        .on("guildMemberRemove", (member) => {
            if (!member.user) {
                return;
            }

            const leaveEmbed = new MessageEmbed()
                .setTitle(`Member Left`)
                .setColor("#A803A8")
                .addField("Member »", `${member.user.username}`, true)
                .addField("ID »", `${member.user.id}`, true)
                .setFooter(
                    `${member.user.username}`,
                    member.user.avatarURL() || undefined
                )
                .setTimestamp();

            return (logChannel as TextChannel).send(leaveEmbed);
        })
        .on("channelCreate", (channel) => {
            if (!client.user) {
                return;
            }

            const channelCreateEmbed = new MessageEmbed()
                .setTitle(`Channel Created`)
                .setColor("#A803A8")
                .addField("Channel »", `<#${channel.id}>`, true)
                .addField("ID »", `${channel.id}`, true)
                .setFooter("Liquid", client.user.avatarURL() || undefined)
                .setTimestamp();

            return (logChannel as TextChannel).send(channelCreateEmbed);
        })
        .on("channelDelete", (channel) => {
            if (!client.user) {
                return;
            }

            const channelDeleteEmbed = new MessageEmbed()
                .setTitle(`Channel Deleted`)
                .setColor("#A803A8")
                .addField("Channel »", `<#${channel.id}>`, true)
                .addField("ID »", `${channel.id}`, true)
                .setFooter("Liquid", client.user.avatarURL() || undefined)
                .setTimestamp();

            return (logChannel as TextChannel).send(channelDeleteEmbed);
        })
        .on("channelUpdate", (oldChannel, newChannel) => {
            if (!client.user) {
                return;
            }

            const channelUpdateEmbed = new MessageEmbed()
                .setTitle(`Channel Updated ${(newChannel as TextChannel).name}`)
                .setColor("#A803A8")
                .addField(
                    "Channel Before »",
                    `${(oldChannel as TextChannel).name}`,
                    true
                )
                .addField(
                    "Channel After »",
                    `${(newChannel as TextChannel).name}`,
                    true
                )
                .setFooter("Liquid", client.user.avatarURL() || undefined)
                .setTimestamp();

            return (logChannel as TextChannel).send(channelUpdateEmbed);
        })
        .on("roleCreate", (role) => {
            if (!client.user) {
                return;
            }

            const roleCreatedEmbed = new MessageEmbed()
                .setTitle(`Role Created`)
                .setColor("#A803A8")
                .addField("Role »", `${role.name}`, true)
                .addField("ID »", `${role.id}`, true)
                .setFooter("Liquid", client.user.avatarURL() || undefined)
                .setTimestamp();

            return (logChannel as TextChannel).send(roleCreatedEmbed);
        })
        .on("roleDelete", (role) => {
            if (!client.user) {
                return;
            }

            const roleDeletedEmbed = new MessageEmbed()
                .setTitle(`Role Deleted`)
                .setColor("#A803A8")
                .addField("Role »", `${role.name}`, true)
                .addField("ID »", `${role.id}`, true)
                .setFooter("Liquid", client.user.avatarURL() || undefined)
                .setTimestamp();

            return (logChannel as TextChannel).send(roleDeletedEmbed);
        })
        .on("roleUpdate", (oldRole, newRole) => {
            if (!client.user) {
                return;
            }

            const roleUpdateEmbed = new MessageEmbed()
                .setTitle(`Role Updated`)
                .setColor("#A803A8")
                .addField("Role Before »", `${oldRole.name}`, true)
                .addField("Role After »", `${newRole.name}`, true)
                .setFooter("Liquid", client.user?.avatarURL() || undefined)
                .setTimestamp();

            return (logChannel as TextChannel).send(roleUpdateEmbed);
        });
};
