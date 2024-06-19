export interface UserDetail{
    id: string;
    firstname : string;
    lastname: string;
    email:  string;
    roles: string[];
    phoneNumber: string;
    twoFactorEnabled: true;
    phoneNumberConfirmed: true ;
    accessFailedCount: 0;
}