import * as Discord from "discord.js";

import { ExtendedClient } from "../lib/Client";
import { TextChannel } from "discord.js";

export const voiceEvents = (client: ExtendedClient) => {
    const logChannel = client.channels.cache.get("614904031743049734");

    if (!logChannel) {
        return;
    }

    client.on("voiceStateUpdate", (oldState, newState) => {});
};
