import { UserError } from "./base";

export class NoPermissions extends UserError {
    constructor() {
        super(`Bạn không có quyền để sử dụng lệnh này.`);
    }
}
