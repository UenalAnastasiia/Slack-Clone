export class Chat {
    id: any;
    firstUser: any;
    secondUser: any;
    message: any;
    uploadFile: any;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstUser = obj ? obj.firstUser : '';
        this.secondUser = obj ? obj.secondUser : '';
        this.message = obj ? obj.message : '';
        this.uploadFile = obj ? obj.uploadFile : '';
    }

    public toJSON() {
        return {
            id: this.id,
            firstUser: this.firstUser,
            secondUser: this.secondUser,
            message: this.message,
            uploadFile: this.uploadFile
        }
    }
}