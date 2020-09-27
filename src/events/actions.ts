import * as Discord from "discord.js";

import { ExtendedClient } from "../lib/Client";
import { DefiniteGuildMessage } from "../lib/Command";
import { client } from "../index";

/** client
    .on("guildBanAdd", (guild, member) => {
        const logChannel = guild.channels.cache.get("741247035864383538");
    })
    .on("guildBanRemove", (guild, member) => {
        const logChannel: Discord.TextChannel = guild.channels.cache.get(
            "741247035864383538"
        );
        if (!logChannel instanceof Discord.TextChannel) {
            return;
        }
        if (!logChannel) {
            return;
        }
    });
*/
