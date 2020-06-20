import * as Discord from "discord.js";
import { inspect } from "util";

import { ownerID } from "../env";
import { sendErrorEmbed } from "../errors";
import { ExtendedClient } from "../lib/Client";
import { Command, DefiniteGuildMessage } from "../lib/Command";

export class evalCmd extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "evalCmd", guildOnly: true });
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
      return message.channel.send(evalEmbed);
    }
    try {
      const code = args.join(" ");
      // tslint:disable-next-line: no-eval
      let evaled = eval(code);

      if (typeof evaled !== "string") {
        evaled = inspect(evaled);
      }

      message.channel.send(this.clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
    }
  }
}
