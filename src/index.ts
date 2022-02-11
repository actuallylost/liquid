// Config -
import { config } from "dotenv";

// Events -
import {
    actEvents,
    memberEvents,
    msgEvents,
    guildEvents,
    voiceEvents,
} from "./events";

// LiquidClient -
import { LiquidClient } from "./lib/Client";

// check environment, if is not production, load from file.
if (process.env.NODE_ENV !== "production") {
    config();
}

export const client = new LiquidClient();

/**
 * Calls events.
 */
// actEvents(client);
// guildEvents(client);
// memberEvents(client);
// msgEvents(client);
// voiceEvents(client);

client.login().catch((err) => client.logger.error(err));
