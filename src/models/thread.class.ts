export class Thread {
    message: any;
    id: any;
    channelID: any;
    sendDateTime: any;
    currentUser: any;
    uploadFile: any;

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
        this.id = obj ? obj.id : '';
        this.channelID = obj ? obj.channelID : '';
        this.sendDateTime = obj ? obj.sendDateTime : '';
        this.currentUser = obj ? obj.currentUser : '';
        this.uploadFile = obj ? obj.uploadFile : '';

    }

    public toJSON() {
        return {
            message: this.message,
            id: this.id,
            channelID: this.channelID,
            sendDateTime: this.sendDateTime,
            currentUser: this.currentUser,
            uploadFile: this.uploadFile
        }
    }
}