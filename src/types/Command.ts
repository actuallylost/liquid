import { Guild, GuildMember, Message } from "discord.js";

export type DefiniteGuildMessage = Message & {
  guild: Guild;
  member: GuildMember;
};
