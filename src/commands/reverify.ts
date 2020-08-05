import * as Discord from "discord.js";

import { sendErrorEmbed } from "../errors";
import { ExtendedClient } from "../lib/Client";
import { Command, DefiniteGuildMessage } from "../lib/Command";

export class reverify extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "reverify",
            guildOnly: true,
            description: "Restarts the verification process.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        message.member.roles.add("634392381294116904");

        const hex = "abcdef0123456789";

        let hexCode = "";

        for (let i = 0; i < 8; i++) {
            hexCode += hex[Math.round(Math.random() * hex.length)];
        }

        const dmMessage = (await message.author
            .send(
                `:wave: Heyo! This server uses our **Verification System**. To be able to have access to the rest of the server, please verify so we know that you're not a bot user. Send ${hexCode} to the bot, in order to be verified.`
            )
            .catch((err) => undefined)) as Discord.Message | undefined;

        if (!dmMessage) {
            return;
        }

        dmMessage.channel
            .awaitMessages(
                (testMessage) => {
                    return testMessage.content === hexCode.toString();
                },
                {
                    errors: ["time"],
                    max: 1,
                    time: 60000,
                }
            )
            .then(() => {
                message.author.send(
                    "Thanks for Verifying! You now have access to all of the server."
                );
                message.member.roles.remove("634392381294116904");
                message.member.roles.add("614903485858578513");
            })
            .catch((e) => {
                console.log(e);
                message.author.send(
                    "Timed out. Please run the `+reverify` command to reverify."
                );
            });
    }
}
