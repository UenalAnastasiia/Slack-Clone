export class Message {
    user: any;
    messageText: any;
    uploadFile: any;
    messageDateTime: any;
    messageID: any;
    userImg: any;

    constructor(obj?: any) {
        this.user = obj ? obj.user : '';
        this.messageText = obj ? obj.messageText : '';
        this.uploadFile = obj ? obj.uploadFile : '';
        this.messageDateTime = obj ? obj.messageDateTime : '';
        this.messageID = obj ? obj.messageID : '';
        this.userImg = obj ? obj.userImg : '';
    }

    public toJSON() {
        return {
            user: this.user,
            messageText: this.messageText,
            uploadFile: this.uploadFile,
            messageDateTime: this.messageDateTime,
            messageID: this.messageID,
            userImg: this.userImg
        }
    }
}