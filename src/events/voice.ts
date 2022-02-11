import * as Discord from "discord.js";

import { LiquidClient } from "../lib/Client";
import { TextChannel } from "discord.js";

export const voiceEvents = (client: LiquidClient) => {
    const logChannel = client.channels.cache.get("614904031743049734");

    if (!logChannel) {
        return;
    }

    client.on("voiceStateUpdate", (oldState, newState) => {});
};
