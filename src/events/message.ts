import * as Discord from "discord.js";

import { ExtendedClient } from "../lib/Client";
import { DefiniteGuildMessage } from "../lib/Command";
import { client } from "../index";

/**
 client.on("message", (message) => {
    if (!message.guild) {
        return;
    }
    console.log("test 0 works");

    const logChannel = message.guild.channels.cache.get("741247035864383538");

    if (!logChannel || !(logChannel instanceof Discord.DMChannel)) {
        return;
    }
    console.log("test 1 works");
    message.channel.send(
        `\`[${message.createdAt}]\` ${message.author} (\`${message.author.id}\`) sent \`${message.content}\` in **${message.guild}** (\`${message.guild.id}\`)`
    );
    console.log("test 2 works");
});*/
