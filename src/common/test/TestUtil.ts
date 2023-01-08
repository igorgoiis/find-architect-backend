import { Gender } from '@prisma/client';
import { Architect } from './../../architect/models/architect.model';

export default class TestUtil {
  static giveAMeAValidArchitect(): Architect {
    const architect = new Architect();
    architect.id = '82922d2d-3665-489f-a6ab-b45f3e9bd2ca';
    architect.email = 'osvodak@architect.com';
    architect.bio =
      'Mussum Ipsum, cacilds vidis litro abertis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis.';
    architect.password = '123456';
    architect.name = 'Osvodak Darsi';
    architect.phone = '74988776655';
    architect.gender = Gender.M;
    architect.birdDate = new Date('02/30/1992');
    architect.createdAt = new Date();
    architect.updatedAt = new Date();

    return architect;
  }
}
