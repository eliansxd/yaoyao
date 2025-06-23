import { MessageCommand } from "../../modules/command";
import { ownerOnly } from "../../modules/checks/access";
import { inspect } from "util";
import { codeBlock } from "discord.js";

export default new MessageCommand({
    name: "eval",
    aliases: ["exec", "execute"],
    validate(message, ...code) {
        if (code?.length) return true;
        message.reply("Code đâu :dead:");
        return false;
    },
    checks: [ownerOnly],
    async run(message, ...codes) {
        const codeText = codes.join("\n");
        const matches = [...codeText.matchAll(/```(?:\w+)?\n([\s\S]*?)```/g)];
        const newCode = matches[0]?.[1] || codeText;

        try {
            const evalResult = await eval(`(async () => { ${newCode} })()`);
            const finalResult = String(inspect(evalResult, { depth: 0 })).replace(/`/g, "\\`");
            await message.reply(codeBlock("js", finalResult));
        } catch (err) {
            await message.reply(codeBlock("js", String(err).replace(/`/g, "\\`")));
        }
    },
});
