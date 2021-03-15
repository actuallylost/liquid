import * as Discord from "discord.js";

import { ExtendedClient } from "../lib/Client";
import { TextChannel } from "discord.js";

export const voiceEvents = (client: ExtendedClient) => {
    const logChannel = client.channels.cache.get("817296242169741334");

    if (!logChannel) {
        return;
    }

    client.on("voiceStateUpdate", (oldState, newState) => {});
};
