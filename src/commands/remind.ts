import * as Discord from "discord.js";

export const avatar = (
  client: Discord.Client,
  message: Discord.Message,
  args: string[],
) => {
  // Assuming that you use message instead of message
  try {
    let returntime: number;
    let timemeasure: string;

    console.log(
      "Message recieved from " +
        message.author.id +
        " at " +
        Date.now().toString(),
    );

    timemeasure = message[1].substring(
      message[1].length - 1,
      message[1].length,
    );
    returntime = message[1].substring(0, message[1].length - 1);

    // Based off the delimiter, sets the time
    switch (timemeasure) {
      case "s":
        returntime = returntime * 10e3;
        break;

      case "m":
        returntime = returntime * 10e3 * 60;
        break;

      case "h":
        returntime = returntime * 10e3 * 60 * 60;
        break;

      case "d":
        returntime = returntime * 10e3 * 60 * 60 * 24;
        break;

      default:
        returntime = returntime * 10e3;
        break;
    }

    // Returns the Message
    client.setTimeout(() => {
      // Removes the first 2 array items
      args.shift();
      args.shift();

      // Creates the message
      const content = args.join(" ");
      message.reply(content);

      console.log(
        "Message sent to " + message.author.id + " at " + Date.now().toString(),
      );
    }, returntime);
  } catch (e) {
    message.reply(
      "Please make sure the command has a time delimiter and message",
    );
    console.error(e.toString());
  }
};
