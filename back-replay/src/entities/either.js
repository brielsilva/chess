export class Either {
    constructor(success) {
        this.success = success;
    }
    isSuccess() {
        return this.success;
    }
}