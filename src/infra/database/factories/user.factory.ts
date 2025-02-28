import { faker } from '@faker-js/faker';
import { User } from '@modules/user/entity/User';
import * as bcrypt from 'bcryptjs';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, async () => {
  const user = new User();
  user.name = faker.person.fullName();
  user.email = faker.internet.email();
  user.password = await bcrypt.hash('password123', 10);
  user.email_verified = faker.datatype.boolean();
  return user;
});
