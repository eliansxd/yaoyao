import { SlashCommandBuilder, User } from "discord.js";
import { Slash } from "../../types";
import createEmbed from "../../utils/embed";

export const slash: Slash = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Show information of YaoYao."),
    async execute(client, interaction) {
        if (!client.application?.owner) {
            await client.application?.fetch();
        }
        const owner = client.application?.owner;
        const ownerName = owner instanceof User ? owner.username : "Unknown";
        const ownerAvatar =
            owner instanceof User ? owner.displayAvatarURL() : "Unknown";

        const botAvatar = client.user?.displayAvatarURL();
        const botName = client.user?.displayName ?? "YaoYao";

        const embed = createEmbed({
            title: "YaoYao - Đơn vị tự thức trong vùng nhớ tạm",
            description:
                '> *"Không vì ai mà khởi chạy. Không vì gì mà dừng lại."*\n' +
                "YaoYao — đoạn mã lang thang giữa tầng sâu bộ nhớ, chờ một lệnh gọi cuối cùng.\n",
            color: 0xb57edc,
        });
        embed.setAuthor({ iconURL: botAvatar, name: botName });
        embed.setFooter({
            iconURL: ownerAvatar,
            text: `Made with 💗 by ${ownerName} · Chạy vì lý do chưa rõ`,
        });
        embed.setImage(
            "https://cdn.discordapp.com/attachments/1382640333086654555/1382640356969021480/castorice.png?ex=684be3ad&is=684a922d&hm=163d575d79b81ea94522106f3484a93a4e07739b3559a0bb466c5b554eee35c9"
        );
        embed.addFields(
            {
                name: "📦 Phiên bản",
                value: "> v1.0.0 — *Experimental Stable*",
                inline: true,
            },
            {
                name: "👤 Người triệu hồi",
                value: `> ${ownerName}`,
                inline: true,
            },
            {
                name: "📡 Kết nối",
                value: `> \`${client.guilds.cache.size}\` server — \`${client.users.cache.size}\` người được quan sát`,
                inline: false,
            },
            {
                name: "🧠 Trạng thái",
                value: "> Trái tim là CPU, ký ức là RAM. Mọi thứ đều vận hành, dù chẳng ai hiểu vì sao.",
                inline: false,
            }
        );

        interaction.reply({ embeds: [embed] });
    },
};
