// Database -
import "reflect-metadata";

// Commands -
import * as commands from "./commands";
// Events -
import * as events from "./events";
// Token -
import { token } from "./env";
// ExtendedClient -
import { ExtendedClient } from "./lib/Client";

const client = new ExtendedClient();

client.registerCommands(...Object.values(commands));

client
    .on("ready", () => {
        client.user.setActivity(`${client.guilds.cache.size} guilds.`, {
            type: "WATCHING",
        });
    })
    .on("guildMemberAdd", async (member) => {
        member.roles.add("710574809951764491");

        const hex = "abcdef0123456789";

        let hexCode = "";

        for (let i = 0; i < 8; i++) {
            hexCode += hex[Math.round(Math.random() * hex.length)];
        }

        const dmMessage = await member
            .send(
                `:wave: Heyo! This server uses our **Verification System**. To be able to have access to the rest of the server, please verify so we know that you're not a bot user. Send ${hexCode} to the bot, in order to be verified.`
            )
            .catch(() => undefined);

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
            .then(async () => {
                member.send(
                    "Thanks for Verifying! You now have access to all of the server."
                );
                // await member.roles.remove("634392381294116904");
                // await member.roles.add("614903485858578513");
            })
            .catch((e) => {
                client.logger.error(e);
                member.send(
                    "Timed out. Please run the `+reverify` command to reverify."
                );
            });
    });
client.login(token);
