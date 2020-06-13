import { Client, Collection, Message } from "discord.js";

import {
  addRole,
  avatar,
  ban,
  botinfo,
  clear,
  evalCmd as eval,
  hug,
  info,
  kick,
  prefix,
  removeRole,
  reverify,
  say,
  suggest,
  support,
  unban,
} from "./commands";
// Token
import { botPrefix, token } from "./env";

interface ExtendedClient extends Client {
  commands: Collection<
    string,
    (client: ExtendedClient, message: Message, args: string[]) => any
  >;
}

const client = new Client() as ExtendedClient;

client.commands = new Collection(
  [
    addRole,
    avatar,
    ban,
    botinfo,
    clear,
    eval,
    hug,
    info,
    kick,
    prefix,
    removeRole,
    reverify,
    say,
    suggest,
    support,
    unban,
  ].map((v) => [v.name, v])
);

client
  .on("ready", () => {
    console.log("[READY] ori is cute");
    client.user?.setActivity("you ;3", { type: "WATCHING" });
    client.user?.setStatus("dnd");
  })
  .on("guildMemberAdd", async (member) => {
    member.roles.add("634392381294116904");

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
      .then(() => {
        member.send(
          "Thanks for Verifying! You now have access to all of the server."
        );
        member.roles.remove("634392381294116904");
        member.roles.add("614903485858578513");
      })
      .catch((e) => {
        console.log(e);
        member.send(
          "Timed out. Please run the `+reverify` command to reverify."
        );
      });
  })
  .on("message", (message) => {
    if (!message.content.startsWith(botPrefix)) {
      return;
    }

    const args = message.content.slice(botPrefix.length).trim().split(" ");

    const command = client.commands.get(args[0]);
    if (command) {
      return command(client, message, args.slice(1));
    } else {
      console.warn("Command not found: ", args[0]);
    }
  });

client.login(token);
