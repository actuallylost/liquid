import { Client, Message, MessageEmbed } from "discord.js";

/**
 * Add roles to a user.
 */
export const addRole = (client: Client, message: Message, args: string[]) => {
  if (!message.member?.hasPermission("MANAGE_ROLES")) {
    const roleErrorNoPerms = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! You don't have permissions to run this command."
      );
    return message.channel.send(roleErrorNoPerms);
  }

  const member =
    message.mentions.members?.first() ||
    message.guild?.members.cache.get(args[1]);

  if (!member) {
    const roleErrorNoUser = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a user to add a role to. Format is `.roles.add <user> <role>`."
      );
    return message.channel.send(roleErrorNoUser);
  }

  const roleToAdd =
    message.mentions.roles.first() || message.guild?.roles.cache.get(args[2]);
  if (!roleToAdd) {
    const roleErrorNoRole = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a role. Format is `.roles.add <user> <role>`."
      );
    return message.channel.send(roleErrorNoRole);
  }

  if (!member) {
    const roleUserErrorNonexistant = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `.roles.add <user> <role>`."
      );
    return message.channel.send(roleUserErrorNonexistant);
  }

  if (roleToAdd) {
    const roleErrorNonexistant = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That role doesn't exist, maybe you typed something wrong? Format is `.roles.add <user> <role>`."
      );
    return message.channel.send(roleErrorNonexistant);
  }

  const roleEmbed = new MessageEmbed()
    .setTitle("Role Added")
    .setColor("#2bd642")
    .setDescription(
      `:white_check_mark: Gotcha! Added ${roleToAdd} to ${member}!`
    );
  member.roles.add(roleToAdd);
  return message.channel.send(roleEmbed);
};

/**
 * Remove roles from a user.
 */

export const removeRole = (
  client: Client,
  message: Message,
  args: string[]
) => {
  if (!message.member?.hasPermission("MANAGE_ROLES")) {
    const roleErrorNoPerms = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! You don't have permissions to run this command."
      );
    return message.channel.send(roleErrorNoPerms);
  }

  const member =
    message.mentions.members?.first() ||
    message.guild?.members.cache.get(args[1]);

  if (!member) {
    const roleErrorNoUser = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a user to add a role to. Format is `+removerole <user> <role>`."
      );
    return message.channel.send(roleErrorNoUser);
  }

  const roleToRemove =
    message.mentions.roles.first() || message.guild?.roles.cache.get(args[2]);

  if (!roleToRemove) {
    const roleErrorNoRole = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a role. Format is `+removerole <user> <role>`."
      );
    return message.channel.send(roleErrorNoRole);
  }
  if (!member) {
    const roleUserErrorNonexistant = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+removerole <user> <role>`."
      );
    return message.channel.send(roleUserErrorNonexistant);
  }
  if (!roleToRemove) {
    const roleErrorNonexistant = new MessageEmbed()
      .setTitle("Role Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That role doesn't exist, maybe you typed something wrong? Format is `+removerole <user> <role>`."
      );
    return message.channel.send(roleErrorNonexistant);
  }
  const roleEmbed = new MessageEmbed()
    .setTitle("Role Removed")
    .setColor("#2bd642")
    .setDescription(
      `:white_check_mark: Gotcha! Removed ${roleToRemove} from ${member}!`
    );
  member.roles.remove(roleToRemove);
  return message.channel.send(roleEmbed);
};
