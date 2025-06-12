import { EmbedBuilder } from "discord.js";
import { Colors } from "../constants/colors";
import { EmbedOptions } from "../types";

function createEmbed(options: EmbedOptions): EmbedBuilder {
    const {
        title,
        description,
        image,
        thumbnail,
        timestamp = false,
        footer,
        color = Colors.Info,
    } = options;
    const embed = new EmbedBuilder().setColor(color);
    if (title) embed.setTitle(title);
    if (description) embed.setDescription(description);
    if (image) embed.setImage(image);
    if (thumbnail) embed.setThumbnail(thumbnail);
    if (timestamp) embed.setTimestamp();
    if (footer) embed.setFooter({ text: footer });
    return embed;
}

export { createEmbed };
