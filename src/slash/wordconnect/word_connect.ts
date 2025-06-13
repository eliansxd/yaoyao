import { ChannelType, SlashCommandBuilder } from "discord.js";
import { Slash } from "../../types";

export const slash: Slash = {
    data: new SlashCommandBuilder()
        .setName("word_connect")
        .setDescription("Các lệnh thiết lập Nối Từ.")
        .addSubcommand((cmd) =>
            cmd
                .setName("setup")
                .setDescription("Thiết lập Nối Từ trong server của bạn.")
                .addChannelOption((opt) =>
                    opt
                        .setName("channel")
                        .setDescription(
                            "Kênh chat nơi mọi người sẽ chơi Nối Từ."
                        )
                        .addChannelTypes(ChannelType.GuildText)
                )
        )
        .addSubcommand((cmd) =>
            cmd
                .setName("reset")
                .setDescription("Đặt lại từ đã sử dụng trong kênh Nối Từ")
                .addChannelOption((opt) =>
                    opt
                        .setName("channel")
                        .setDescription("Kênh chat nơi mọi người chơi Nối Từ.")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        )
        .addSubcommand((cmd) =>
            cmd
                .setName("remove")
                .setDescription("Xóa thiết lập kênh chơi Nối Từ")
                .addChannelOption((opt) =>
                    opt
                        .setName("channel")
                        .setDescription("Kênh chat nơi mọi người chơi Nối Từ.")
                        .addChannelTypes(ChannelType.GuildText)
                        .setRequired(true)
                )
        ),
};
