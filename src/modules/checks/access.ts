import YaoYao from "../../YaoYao";
import { NoPermissions } from "../exceptions/access";
import { Message, PermissionResolvable } from "discord.js";

export function hasPermissions(perms: PermissionResolvable[]) {
    return (message: Message<true>) => {
        if (!message.member?.permissions.has(perms)) throw new NoPermissions();
        return true;
    };
}

export function ownerOnly(message: Message<true>) {
    const yaoyao = message.client as YaoYao;
    if (!yaoyao.owners.includes(message.author)) throw new NoPermissions();
    return true;
}
