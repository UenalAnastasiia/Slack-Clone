export class User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;

    constructor(obj?: any) {
        this.uid = obj ? obj.uid : '';
        this.email = obj ? obj.email : '';
        this.displayName = obj ? obj.displayName : '';
        this.photoURL = obj ? obj.photoURL : '';
    }

    public toJSON() {
        return {
            uid: this.uid,
            email: this.email,
            displayName: this.displayName,
            photoURL: this.photoURL
        }
    }
}