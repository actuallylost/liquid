import * as Discord from "discord.js";

export const kick = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
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
    const kickErrorNoUser = new Discord.RichEmbed()
      .setTitle("Kick Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a user to kick. Format is `+kick <user> [reason]`."
      );
    return message.channel.send(kickErrorNoUser);
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

  if (userToKick.id == message.member.id) {
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
};

export const ban = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
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
    const banErrorNoUser = new Discord.RichEmbed()
      .setTitle("Ban Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a user to ban. Format is `+ban <user> [reason]`."
      );
    return message.channel.send(banErrorNoUser);
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
    const banErrorBannable = new Discord.RichEmbed()
      .setTitle("Ban Error")
      .setColor("#d91818")
      .setDescription(":x: Oops! That user is not able to be banned.");
    return message.channel.send(banErrorBannable);
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
};

export const unban = async (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
  if (!args[1]) {
    const unbanErrorNoUser = new Discord.RichEmbed()
      .setTitle("Unban Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a user to unban. Format is `+unban <user> [reason]`."
      );
    return message.channel.send(unbanErrorNoUser);
  }

  const userToUnban = message.guild.members.get(args[0])
    ? message.guild.members.get(args[0])
    : message.mentions.members.first();

  await message.guild.unban(userToUnban).catch((err) => {
    const unbanError = new Discord.RichEmbed()
      .setTitle("Unban Error")
      .setColor("#d91818")
      .setDescription(":x: Oops! Could not unban that user.");
    return message.channel.send(unbanError);
  });

  return message.guild
    .unban(`${userToUnban.id}`)
    .then((userToUnban) =>
      message.channel.send(
        `:white_check_mark: Gotcha! ${userToUnban} has been unbanned.`
      )
    )
    .catch(console.error);
};

export const addrole = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    const roleErrorNoPerms = new Discord.RichEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! You don't have permissions to run this command."
      );
    return message.channel.send(roleErrorNoPerms);
  }

  let rMember =
    message.mentions.members.first() || message.guild.members.get(args[1]);

  if (!rMember) {
    const roleErrorNoUser = new Discord.RichEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a user to add a role to. Format is `+addrole <user> <role>`."
      );
    return message.channel.send(roleErrorNoUser);
  }

  const roleToAdd = message.mentions.roles.first()
    ? message.mentions.roles.first().id
    : args[2];
  if (!roleToAdd) {
    const roleErrorNoRole = new Discord.RichEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a role. Format is `+addrole <user> <role>`."
      );
    return message.channel.send(roleErrorNoRole);
  }
  if (rMember == null) {
    const roleUserErrorNonexistant = new Discord.RichEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+addrole <user> <role>`."
      );
    return message.channel.send(roleUserErrorNonexistant);
  }
  if (roleToAdd == null) {
    const roleErrorNonexistant = new Discord.RichEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That role doesn't exist, maybe you typed something wrong? Format is `+addrole <user> <role>`."
      );
    return message.channel.send(roleErrorNonexistant);
  }
  const roleEmbed = new Discord.RichEmbed()
    .setTitle("Role Added")
    .setColor("#2bd642")
    .setDescription(
      `:white_check_mark: Gotcha! Added ${roleToAdd} to ${rMember}!`
    );
  rMember.addRole(roleToAdd);
  return message.channel.send(roleEmbed);
};
