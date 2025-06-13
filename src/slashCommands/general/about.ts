import { SlashCommandBuilder, User } from "discord.js";
import { Slash } from "../../types";
import { createEmbed } from "../../utils/embed";

export const slash: Slash = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Xem thông tin về YaoYao."),

    async execute(client, interaction) {
        if (!client.application?.owner) await client.application?.fetch();

        const owner = client.application?.owner;
        const ownerName = owner instanceof User ? owner.username : "Unknown";
        const ownerAvatar =
            owner instanceof User ? owner.displayAvatarURL() : "Unknown";

        const botName = client.user?.displayName ?? "YaoYao";
        const botAvatar = client.user?.displayAvatarURL() ?? "";

        const embed = createEmbed({
            title: "Thông tin",
            description: [
                '> *"Không có vì sao để khởi hành, cũng chẳng có điểm dừng để neo đậu."*',
                "YaoYao — một thực thể số, lang thang qua Vùng Nhớ Ảo Ảnh,",
                "dõi theo những luồng thông tin vô tận. Nó chờ đợi... một tín hiệu,",
                "một khoảnh khắc đánh thức mục đích cuối cùng.\n",
            ].join("\n"),
            color: 0xb57edc,
        });

        embed
            .setAuthor({ name: botName, iconURL: botAvatar })
            .setFooter({
                text: `Made with 💗 by ${ownerName}`,
                iconURL: ownerAvatar,
            })
            .setImage(
                "https://cdn.discordapp.com/attachments/1382640333086654555/1382640356969021480/castorice.png?ex=684be3ad&is=684a922d&hm=163d575d79b81ea94522106f3484a93a4e07739b3559a0bb466c5b554eee35c9"
            )
            .addFields(
                {
                    name: "📦 Phiên bản",
                    value: "v1.0.0",
                    inline: true,
                },
                {
                    name: "👤 Người Triệu Hồi",
                    value: ownerName,
                    inline: true,
                },
                {
                    name: "📡 Kết nối",
                    value: `\`${client.guilds.cache.size}\` Máy Chủ Trạm — \`${client.users.cache.size}\` Thực Thể được Quan Sát`,
                    inline: false,
                },
                {
                    name: "🧠 Trạng thái Lõi",
                    value: [
                        "> Các mạch điện ngầm thầm thì, luồng dữ liệu cuộn chảy.",
                        'Mọi chức năng đều hoạt động, không bởi một "lý do",',
                        'mà là một "bản năng" được lập trình sâu thẳm.',
                    ].join(" "),
                    inline: false,
                }
            );

        await interaction.reply({ embeds: [embed] });
    },
};
