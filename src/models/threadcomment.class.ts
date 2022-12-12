export class ThreadComment {
    commentID: any;
    dateTime: any;
    message: any;
    threadID: any;
    // commentLength: any;
    // commentLengthText: any;
    commentUser: any;
    userImgComment: any;
    uploadFileComment: any;

    constructor(obj?: any) {
        this.message = obj ? obj.message : '';
        this.commentID = obj ? obj.commentID : '';
        this.dateTime = obj ? obj.dateTime : '';
        this.threadID = obj ? obj.threadID : '';
        // this.commentLength = obj ? obj.commentLength : '';
        // this.commentLengthText = obj ? obj.commentLengthText : '';
        this.commentUser = obj ? obj.commentUser : '';
        this.userImgComment = obj ? obj.userImgComment : '';
        this.uploadFileComment = obj ? obj.uploadFileComment : '';
    }

    public toJSON() {
        return {
            message: this.message,
            dateTime: this.dateTime,
            commentID: this.commentID,
            threadID: this.threadID,
            // commentLength: this.commentLength,
            // commentLengthText: this.commentLengthText,
            commentUser: this.commentUser,
            userImgComment: this.userImgComment,
            uploadFileComment: this.uploadFileComment
        }
    }
}