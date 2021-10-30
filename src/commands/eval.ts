import * as Discord from "discord.js";
import { inspect } from "util";

import { ownerID } from "../env";
import { ExtendedClient } from "../lib/Client";
import { Command, DefiniteGuildMessage } from "../lib/Command";

export class evalCmd extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "eval",
            guildOnly: true,
            description: "[DEVELOPER ONLY] Evaluates code in JavaScript.",
        });
    }

    clean = (text: string) => {
        if (typeof text === "string") {
            return text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };

    async run(message: DefiniteGuildMessage, args: string[]) {
        args = message.content.split(" ").slice(1);

        if (message.author.id !== ownerID) {
            const evalEmbed = new Discord.MessageEmbed()
                .setTitle("Eval Error")
                .setColor("#d91818")
                .setDescription(
                    ":x: Sorry, you have to be the bot owner to use this command!"
                );
            return message.channel.send({embeds: [evalEmbed]});
        }
        try {
            const code = args.join(" ");
            // tslint:disable-next-line: no-eval
            let evaled = eval(code);

            if (typeof evaled !== "string") {
                evaled = inspect(evaled);
            }
            const cleaned = await this.clean(evaled)

            message.channel.send(`\`\`\`ts\n${cleaned}\n\`\`\``);
        } catch (err: any) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
        }
    }
}
