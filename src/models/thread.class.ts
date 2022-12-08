export class Thread {
    message: any;
    id: any;
    channelID: any;
    sendDateTime: any;
    currentUser: any;
    commentID: any;
    commentDateTime: any;
    commentMessage: any;
    commentThreadID: any;
    commentLength: any;
    commentUser: any;
    uploadFile: any;
    

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
        this.id = obj ? obj.id : '';
        this.channelID = obj ? obj.channelID : '';
        this.sendDateTime = obj ? obj.sendDateTime : '';
        this.currentUser = obj ? obj.currentUser : '';
        this.commentID = obj ? obj.commentID : '';
        this.commentDateTime = obj ? obj.commentDateTime : '';
        this.commentMessage = obj ? obj.commentMessage : '';
        this.commentThreadID = obj ? obj.commentThreadID : '';
        this.commentLength = obj ? obj.commentLength : '';
        this.commentUser = obj ? obj.commentUser : '';
        this.uploadFile = obj ? obj.uploadFile : '';
    }

    public toJSON() {
        return {
            message: this.message,
            id: this.id,
            channelID: this.channelID,
            sendDateTime: this.sendDateTime,
            commentID: this.commentID,
            currentUser: this.currentUser,
            commentDateTime: this.commentDateTime,
            commentMessage: this.commentMessage,
            commentThreadID: this.commentThreadID,
            commentLength: this.commentLength,
            commentUser: this.commentUser,
            uploadFile: this.uploadFile
        }
    }
}