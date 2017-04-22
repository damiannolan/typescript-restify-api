import { UserProfile } from './user-profile';

export interface Article {
    author: UserProfile;
    createdAt: string;
    title: string;
    body: string;
    category: string;
};

// export class Article {
//     author: UserProfile;
//     createdAt: string;
//     title: string;
//     body: string;
//     category: string;
// };