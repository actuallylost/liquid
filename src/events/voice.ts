

import { ExtendedClient } from "../lib/Client";

export const voiceEvents = (client: ExtendedClient) => {
    const logChannel = client.channels.cache.get("614904031743049734");

    if (!logChannel) {
        return;
    }

    client.on("voiceStateUpdate", (oldState, newState) => {});
};
