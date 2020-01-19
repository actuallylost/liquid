import { Client, Collection, Message } from "discord.js";
import * as mongoose from "mongoose";

// Commands
import { avatar } from "./commands/avatar";
import { botinfo } from "./commands/botinfo";
import { clear } from "./commands/clear";
import { evalCmd as eval } from "./commands/eval";
import { hug } from "./commands/hug";
import { info } from "./commands/info";
import { addrole, ban, kick, removerole, unban } from "./commands/moderation";
import { reverify } from "./commands/reverify";
import { say } from "./commands/say";
import { suggest } from "./commands/suggest";
import { support } from "./commands/support";

// Token
import { token } from "./env";

interface ExtendedClient extends Client {
  commands: Collection<
    string,
    (client: ExtendedClient, message: Message, args: string[]) => any
  >;
}

const client = new Client() as ExtendedClient;
client.commands = new Collection([
  ["addrole", addrole],
  ["ban", ban],
  ["hug", hug],
  ["info", info],
  ["kick", kick],
  ["removerole", removerole],
  ["avatar", avatar],
  ["botinfo", botinfo],
  ["clear", clear],
  ["eval", eval],
  ["unban", unban],
  ["say", say],
  ["suggest", suggest],
  ["support", support],
  ["reverify", reverify],
]);

const prefix = "+";

client
  .on("ready", () => {
    console.log("[READY] ori is cute");
    client.user.setActivity("you ;3", { type: "WATCHING" });
    client.user.setStatus("dnd");
  })
  .on("guildMemberAdd", async (member) => {
    member.addRole("634392381294116904");

    const hex = "abcdef0123456789";

    let hexCode = "";

    for (let i = 0; i < 8; i++) {
      hexCode += hex[Math.round(Math.random() * hex.length)];
    }

    const dmMessage = (await member
      .send(
        `:wave: Heyo! This server uses our **Verification System**. To be able to have access to the rest of the server, please verify so we know that you're not a bot user. Send ${hexCode} to the bot, in order to be verified.`,
      )
      .catch((err) => undefined)) as Message | undefined;

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
        },
      )
      .then(() => {
        member.send(
          "Thanks for Verifying! You now have access to all of the server.",
        );
        member.removeRole("634392381294116904");
        member.addRole("614903485858578513");
      })
      .catch((e) => {
        console.log(e);
        member.send(
          "Timed out. Please run the `+reverify` command to reverify.",
        );
      });
  })
  .on("message", (message) => {
    if (!message.content.startsWith(prefix)) {
      return;
    }

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(" ");

    const command = client.commands.get(args[0]);
    if (command) {
      return command(client, message, args.slice(1));
    }
  });

mongoose
  .connect("mongodb://localhost:27017/liquid", { useNewUrlParser: true })
  .then(() => client.login(token));
