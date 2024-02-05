/* eslint-disable prettier/prettier */

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordAdmin = await bcrypt.hash('password-admin', roundsOfHashing);
  const passwordUser = await bcrypt.hash('password-user', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {
      password: passwordAdmin,
    },
    create: {
      email: 'admin@gmail.com',
      name: 'Sabin Adams',
      password: passwordAdmin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {
      password: passwordUser,
    },
    create: {
      email: 'user@gmail.com',
      name: 'Alex Ruheni',
      password: passwordUser,
    },
  });
  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });