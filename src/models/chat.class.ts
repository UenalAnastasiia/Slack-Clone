export class Chat {
    id: any;
    firstUser: any;
    secondUser: any;

    constructor(obj?: any) {
        this.id = obj ? obj.id : '';
        this.firstUser = obj ? obj.firstUser : '';
        this.secondUser = obj ? obj.secondUser : '';
    }

    public toJSON() {
        return {
            id: this.id,
            firstUser: this.firstUser,
            secondUser: this.secondUser
        }
    }
}