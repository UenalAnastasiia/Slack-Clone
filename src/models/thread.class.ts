export class Thread {
    message: any;
    id: any;
    channelID: any;
    sendDateTime: any
    commentID: any;
    commentDateTime: any;
    commentMessage: any;

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
        this.id = obj ? obj.id : '';
        this.channelID = obj ? obj.channelID : '';
        this.sendDateTime = obj ? obj.sendDateTime : '';
        this.commentID = obj ? obj.commentID : '';
        this.commentDateTime = obj ? obj.commentDateTime : '';
        this.commentMessage = obj ? obj.commentMessage : '';
    }

    public toJSON() {
        return {
            message: this.message,
            id: this.id,
            channelID: this.channelID,
            sendDateTime: this.sendDateTime,
            commentID: this.commentID,
            commentDateTime: this.commentDateTime,
            commentMessage: this.commentMessage
        }
    }
}