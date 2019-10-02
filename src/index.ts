import * as Discord from "discord.js";
import * as mongoose from "mongoose";
// import * as readline from "readline";

import { token } from "./token";

import { avatar } from "./commands/avatar";
import { botinfo } from "./commands/botinfo";
import { clear } from "./commands/clear";
import { evalCmd } from "./commands/eval";
import { hug } from "./commands/hug";
import { info } from "./commands/info";
import { kick, ban, unban, addrole, removerole } from "./commands/moderation";
import { say } from "./commands/say";
import { support } from "./commands/support";

const client = new Discord.Client();
const prefix = "+";

/* const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}); */

var channelToTalkIn: Discord.TextChannel;

client.on("ready", () => {
  console.log("[READY] ori is cute");
  client.user.setActivity("you ;3", { type: "WATCHING" });
  client.user.setStatus("dnd");
});

/* rl.on("line", (input) => {
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
});*/

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
    case "avatar": {
      avatar(client, message, args);
      break;
    }
    case "botinfo": {
      botinfo(client, message, args);
      break;
    }
    case "clear": {
      clear(client, message, args);
      break;
    }
    case "eval": {
      evalCmd(client, message, args);
      break;
    }
    case "hug": {
      hug(client, message, args);
      break;
    }
    case "info": {
      info(client, message, args);
      break;
    }
    case "kick": {
      kick(client, message, args);
      break;
    }
    case "ban": {
      ban(client, message, args);
      break;
    }
    case "unban": {
      unban(client, message, args);
      break;
    }
    case "say": {
      say(client, message, args);
      break;
    }
    case "support": {
      support(client, message, args);
      break;
    }
    case "addrole": {
      addrole(client, message, args);
      break;
    }
    case "removerole": {
      removerole(client, message, args);
      break;
    }
  }
});

mongoose
  .connect("mongodb://localhost:27017/liquid", { useNewUrlParser: true })
  .then(() => client.login(token));
