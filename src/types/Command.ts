import { Client, ClientUser, Guild, GuildMember, Message } from "discord.js";

type DefiniteGuildMessage = Message & {
  guild: Guild;
  member: GuildMember;
};

/**
 * Command function - typed to be guild-explicit.
 */
export type Command = (
  client: Client & { user: ClientUser },
  message: DefiniteGuildMessage,
  args: string[]
) => any;
