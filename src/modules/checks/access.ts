import { NoPermissions } from "../exceptions/guild";
import { Message, PermissionResolvable } from "discord.js";

export function checkPermissions(perms: PermissionResolvable[]) {
    return (message: Message<true>) => {
        if (!message.member?.permissions.has(perms)) throw new NoPermissions();
        return true;
    };
}
