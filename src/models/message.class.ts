export class Message {
    user: any;
    messageText: any;
    uploadFileM: any;
    messageDateTime: any;
    messageID: any;
    userImg: any;

    constructor(obj?: any) {
        this.user = obj ? obj.user : '';
        this.messageText = obj ? obj.messageText : '';
        this.uploadFileM = obj ? obj.uploadFileM : '';
        this.messageDateTime = obj ? obj.messageDateTime : '';
        this.messageID = obj ? obj.messageID : '';
        this.userImg = obj ? obj.userImg : '';
    }

    public toJSON() {
        return {
            user: this.user,
            messageText: this.messageText,
            uploadFileM: this.uploadFileM,
            messageDateTime: this.messageDateTime,
            messageID: this.messageID,
            userImg: this.userImg
        }
    }
}