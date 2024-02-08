/* eslint-disable prettier/prettier */
import { 
  GROUP_TYPE,
  Gender,
  PrismaClient
 } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import membersData from './data/membersData'
import groupsData from './data/groupsData'
import agenciesData from './data/agenciesData'

// console.log(membersData,
//    groupsData,
//     agenciesData
//   )


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


  await prisma.idol.deleteMany({});
  await prisma.group.deleteMany({});
  await prisma.agency.deleteMany({});

  agenciesData.map(async(agency) => {
    await prisma.agency.create({
      data: {
        name: agency.name,
      }
    })
  })

  groupsData.map(async(group) => {
    await prisma.group.create({
      data: {
        name: group.name,
        type: GROUP_TYPE.GIRL_GROUP,
        memberCount: group.memberCount,
        agency_id: group.agency_id,
      }
    })
  })

  membersData.map(async(member) => {
    await prisma.idol.create({
      data: {
        stageName: member.stageName,
        realName: member.realName,
        birthYear: member.birthYear,
        country: member.country,
        group_id: member.group_id,
        gender: Gender.FEMALE,
      }
    })
  })

  // for(let i = 0; i < all.length; i++) {
  //   const agency = all[i];
  //   const agencyCreated = await prisma.agency.create({
  //     data: {
  //       name: agency.name,
  //     }
  //   })

  //   for(let j = 0; j < agency.groups.length; j++) {
  //     const group = agency.groups[j];
  //     const groupCreated = await prisma.group.create({
  //       data: {
  //         name: group.name,
  //         type: GROUP_TYPE.GIRL_GROUP,
  //         agencyId: agencyCreated.id,
  //         memberCount: group.memberCount
  //       }
  //     })

  //     for(let k = 0; k < group.members.length; k++) {
  //       const member = group.members[k];
  //       await prisma.idol.create({
  //         data: {
  //           name: member.name,
  //           age: member.age,
  //           gender: Gender.FEMALE,
  //           groupId: groupCreated.id,
  //         }
  //       })
  //     }

  //   }

  // }

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