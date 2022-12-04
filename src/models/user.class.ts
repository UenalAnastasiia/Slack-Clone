export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }

// export class User {
//     uid: any;
//     email: any;
//     displayName: any;
//     photoURL: any
//     emailVerified: any;

//     constructor(obj?: any) {
//         this.uid = obj ? obj.uid : '';
//         this.email = obj ? obj.email : '';
//         this.displayName = obj ? obj.displayName : '';
//         this.photoURL = obj ? obj.photoURL : '';
//         this.emailVerified = obj ? obj.emailVerified : '';

//     }

//     public toJSON() {
//         return {
//             uid: this.uid,
//             email: this.email,
//             displayName: this.displayName,
//             photoURL: this.photoURL,
//             emailVerified: this.emailVerified
//         }
//     }
// }