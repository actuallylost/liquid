import * as Discord from "discord.js";

import { ownerID } from "../ownerID";

export const evalCmd = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
  const clean = (text) => {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };
  args = message.content.split(" ").slice(1);

  if (message.author.id !== ownerID) {
    222;
    const evalEmbed = new Discord.RichEmbed()
      .setTitle("Eval Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Sorry, you have to be the bot owner to use this command!"
      );
    return message.channel.send(evalEmbed);
  }
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    message.channel.send(clean(evaled), { code: "xl" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
  }
};
