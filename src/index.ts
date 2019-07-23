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
    case "eval": {
      const clean = (text) => {
        if (typeof text === "string")
          return text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
      };
      const args = message.content.split(" ").slice(1);

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

        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
    case "kick": {
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        const kickErrorNoPerms = new Discord.RichEmbed()
          .setTitle("Ban Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! You don't have permissions to run this command."
          );
        return message.channel.send(kickErrorNoPerms);
      }
      if (!args[1]) {
        const kickErrorNone = new Discord.RichEmbed()
          .setTitle("Kick Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! It seems like you forgot to input a user to kick. Format is `+kick <user> [reason]`."
          );
        return message.channel.send(kickErrorNone);
      }

      const userToKick = message.mentions.members.first();
      if (userToKick == null) {
        const kickErrorNonexistant = new Discord.RichEmbed()
          .setTitle("Kick Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+kick <user> [reason]`."
          );
        return message.channel.send(kickErrorNonexistant);
      }

      if (!userToKick.kickable) {
        const kickErrorKickable = new Discord.RichEmbed()
          .setTitle("Kick Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! That user is not able to be kicked. Format is `+kick <user> [reason]`."
          );
        return message.channel.send(kickErrorKickable);
      }

      if (userToKick == message.member) {
        const kickErrorSelf = new Discord.RichEmbed()
          .setTitle("Kick Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! You cannot kick yourself dummy! Format is `+kick <user> [reason]`."
          );
        return message.channel.send(kickErrorSelf);
      }

      const kickReason = args[2];
      if (kickReason == null) {
        const kickEmbedNoReason = new Discord.RichEmbed()
          .setTitle(`${userToKick.user.username} was successfully kicked`)
          .setColor("#2bd642")
          .setDescription(
            `:white_check_mark: Gotcha! ${userToKick} has been kicked.`
          );
        userToKick.kick();
        return message.channel.send(kickEmbedNoReason);
      }

      const kickEmbedReason = new Discord.RichEmbed()
        .setTitle(`${userToKick.user.username} was successfully kicked`)
        .setColor("#2bd642")
        .setDescription(
          `:white_check_mark: Gotcha! ${userToKick} has been kicked for ${kickReason}.`
        );
      userToKick.kick();
      return message.channel.send(kickEmbedReason);
    }
    case "ban": {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        const banErrorNoPerms = new Discord.RichEmbed()
          .setTitle("Ban Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! You don't have permissions to run this command."
          );
        return message.channel.send(banErrorNoPerms);
      }
      if (!args[1]) {
        const banErrorNone = new Discord.RichEmbed()
          .setTitle("Ban Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! It seems like you forgot to input a user to ban. Format is `+ban <user> [reason]`."
          );
        return message.channel.send(banErrorNone);
      }

      const userToBan = message.mentions.members.first();
      if (userToBan == null) {
        const banErrorNonexistant = new Discord.RichEmbed()
          .setTitle("Ban Error")
          .setColor("#d91818")
          .setDescription(
            ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+ban <user> [reason]`."
          );
        return message.channel.send(banErrorNonexistant);
      }

      if (!userToBan.bannable) {
        const banErrorbanable = new Discord.RichEmbed()
          .setTitle("Ban Error")
          .setColor("#d91818")
          .setDescription(":x: Oops! That user is not able to be banned.");
        return message.channel.send(banErrorbanable);
      }

      if (userToBan == message.member) {
        const banErrorSelf = new Discord.RichEmbed()
          .setTitle("Ban Error")
          .setColor("#d91818")
          .setDescription(":x: Oops! You cannot ban yourself dummy!");
        return message.channel.send(banErrorSelf);
      }

      const banReason = args[2];
      if (banReason == null) {
        const banEmbedNoReason = new Discord.RichEmbed()
          .setTitle(`${userToBan.user.username} was successfully banned`)
          .setColor("#2bd642")
          .setDescription(
            `:white_check_mark: Gotcha! ${userToBan} has been banned.`
          );
        userToBan.ban();
        return message.channel.send(banEmbedNoReason);
      }

      const banEmbedReason = new Discord.RichEmbed()
        .setTitle(`${userToBan.user.username} was successfully banned`)
        .setColor("#2bd642")
        .setDescription(
          `:white_check_mark: Gotcha! ${userToBan} has been banned for ${banReason}.`
        );
      userToBan.ban();
      return message.channel.send(banEmbedReason);
    }
  }
});

client.login(token);