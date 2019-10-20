export interface User {
    id?:number;
    name?: string;
    email: string;
    avatarUrl?: string;
    mobile?: string;
    city?: string;
    age?: number;
    memberOf?: string[];
    skills?: string;
    aboutMe?: string;
    organizations?: string[];
    feedback?: string;
}
