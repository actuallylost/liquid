import * as Discord from "discord.js";
import * as readline from "readline";

import { clear } from "./commands/clear";
import { ownerID } from "./ownerID";
import { token } from "./token";

const client = new Discord.Client();
const prefix = "+";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var channelToTalkIn: Discord.TextChannel;

client.on("ready", () => {
  console.log("[READY] ori is cute");
  client.user.setActivity("you ;3", { type: "WATCHING" });
  client.user.setStatus("dnd");
});

rl.on("line", (input) => {
  if (input.startsWith("!channel")) {
    if (
      !client.channels.get(input.split(" ")[1]) ||
      client.channels.get(input.split(" ")[1]).type !== "text"
    ) {
      console.error("Invalid channel.");
    }
    channelToTalkIn = client.channels.get(
      input.split(" ")[1]
    ) as Discord.TextChannel;
    return console.log("Switched to channel", channelToTalkIn.id);
  }

  if (channelToTalkIn) {
    channelToTalkIn.send(input);
  }
});

client.on("message", (message) => {
  console.log(message.author.tag, message.content);

  if (!message.content.startsWith(prefix)) {
    return;
  }

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(" ");

  switch (args[0]) {
    case "clear": {
      clear(client, message, args);
    }
  }
});

client.login(token);
