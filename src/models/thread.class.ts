export class Thread {
    message: any;
    id: any;
    channelID: any;

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
        this.id = obj ? obj.id : '';
        this.channelID = obj ? obj.channelID : '';
    }

    public toJSON() {
        return {
            message: this.message,
            id: this.id,
            channelID: this.channelID
        }
    }
}