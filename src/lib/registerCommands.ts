import { config } from "dotenv";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import * as commands from "../../src/commands";

// check environment, if is not production, load from file.
if (process.env.NODE_ENV !== "production") {
    config();
}
// extract token and id
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const APPLICATION_ID = process.env.APPLICATION_ID;
const DEV_SERVER_GUILD_ID = process.env.DEV_SERVER_GUILD_ID;
// ensure enviorment variables are set
if (!ACCESS_TOKEN) {
    throw new Error("ACCESS_TOKEN is not defined");
}
if (!APPLICATION_ID) {
    throw new Error("APPLICATION_ID is not defined");
}
if (!DEV_SERVER_GUILD_ID) {
    throw new Error("DEV_SERVER_GUILD_ID is not defined");
}
// extract command data
const data = Object.values(commands).map((command) => command.toJSON());
// set up rest client
const rest = new REST({ version: "9" }).setToken(ACCESS_TOKEN);
// push commands to discord
rest.put(Routes.applicationGuildCommands(APPLICATION_ID, DEV_SERVER_GUILD_ID), {
    body: data,
}).then(() => {
    // noop
}, console.error);
