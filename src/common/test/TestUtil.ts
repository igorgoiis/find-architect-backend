import { Gender, Role } from '@prisma/client';
import { User } from './../../user/models/user.model';

export default class TestUtil {
  static giveAMeAValidUser(): User {
    const user = new User();
    user.id = '82922d2d-3665-489f-a6ab-b45f3e9bd2ca';
    user.email = 'osvodak@architect.com';
    user.name = 'Osvodak Darsi';
    user.phone = '74988776655';
    user.gender = Gender.M;
    user.role = Role.ARCHITECT;
    user.birdDate = new Date('02/30/1992');
    user.createdAt = new Date();
    user.updatedAt = new Date();

    return user;
  }
}
