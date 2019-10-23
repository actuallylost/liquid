import * as Discord from "discord.js";
import { inspect } from "util";

import { ownerID } from "../ownerID";

const clean = (text) => {
  if (typeof text === "string") {
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  } else {
    return text;
  }
};

export const evalCmd = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[],
) => {
  args = message.content.split(" ").slice(1);

  if (message.author.id !== ownerID) {
    const evalEmbed = new Discord.RichEmbed()
      .setTitle("Eval Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Sorry, you have to be the bot owner to use this command!",
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

    message.channel.send(clean(evaled), { code: "xl" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
};
