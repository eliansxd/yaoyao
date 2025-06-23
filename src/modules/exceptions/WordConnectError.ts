import { WordConnectError } from "./base";

export class PlayerAlreadyPlayed extends WordConnectError {
    constructor() {
        super(`Bạn đã chơi trước đó rồi, hãy chờ người khác nối tiếp từ của bạn.`);
    }
}

export class WordAlreadyUsed extends WordConnectError {
    constructor() {
        super(`Từ này đã được dùng ở lần chơi trước, vui lòng sử dụng từ khác.`);
    }
}

export class WordNotFound extends WordConnectError {
    constructor(word: string) {
        super(`Từ \`${word}\` không tồn tại trong từ điển của bot.`);
    }
}

export class SyntaxError extends WordConnectError {
    constructor() {
        super(`Bạn cần gửi theo cú pháp: \`từ1 từ2\``);
    }
}

export class WrongLastWord extends WordConnectError {
    constructor(word: string) {
        super(`Từ được dùng ở lần chơi trước là: \`${word}\``);
    }
}
