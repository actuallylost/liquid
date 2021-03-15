// import { MessageEmbed } from "discord.js";

// import { Levels } from "../../entities/Levels";
// import { sendErrorEmbed } from "../../errors";
// import { ExtendedClient } from "../../lib/Client";
// import { Command, DefiniteGuildMessage } from "../../lib/Command";

// export class Level extends Command {
//     constructor(client: ExtendedClient) {
//         super(client, {
//             name: "level",
//             guildOnly: true,
//             description: "Check ",
//         });
//     }

//     async run(message: DefiniteGuildMessage, args: string[]) {
//         const repo = this.client.connection.getRepository(Levels);
//         let uID = repo.findOne(message.author.id);
//         let gID = repo.findOne(message.guild.id);
//     }
// }
