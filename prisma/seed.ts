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

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordAdmin = await bcrypt.hash('password-admin', roundsOfHashing);
  const passwordUser = await bcrypt.hash('password-user', roundsOfHashing);


  const insertUser = async() => {
    await prisma.user.upsert({
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
    await prisma.user.upsert({
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
  }

  await prisma.idol.deleteMany({});
  await prisma.group.deleteMany({});
  await prisma.agency.deleteMany({});

  const insertAgency = async() => {
    agenciesData.sort((a, b) => a.id - b.id ).map(async(agency) => {
      const agencyCreated = await prisma.agency.create({
        data: {
          id: agency.id,
          name: agency.name,
        }
      })
      if(agencyCreated) {
        const filteredGroup = groupsData.filter(group => group.agency_id === agencyCreated.id)
        if(filteredGroup) {
          filteredGroup.map(async(g) => {
            const groupCreated = await prisma.group.create({
              data: {
                id: g.id,
                name: g.name,
                type: GROUP_TYPE.GIRL_GROUP,
                memberCount: g.memberCount,
                debutYear: g.debutYear,
                profile_link: g.profile_link,
                agency_id: agencyCreated.id,
              }
            })
            if(groupCreated) {
              const filteredMembers = membersData.filter(members => members.group_id === groupCreated.id)
              if(filteredMembers) {
                filteredMembers.map(async(m) => {
                  if(!m || m.stageName == null) return
                  await prisma.idol.create({
                    data: {
                      stageName: m.stageName,
                      realName: m.realName,
                      birthYear: m.birthYear,
                      country: m.country,
                      group_id: groupCreated.id,
                      gender: Gender.FEMALE,
                    }
                  })
                })
              }
            }
          })
        }
      }
    })
  }

  await insertUser()
  await insertAgency()

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