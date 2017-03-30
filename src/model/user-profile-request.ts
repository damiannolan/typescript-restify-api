import * as restify from 'restify';
import { UserProfile } from './user-profile';

export interface UserProfileRequest extends restify.Request {
    userProfile: UserProfile;
}
