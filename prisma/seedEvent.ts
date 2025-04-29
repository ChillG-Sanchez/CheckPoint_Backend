import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Példa felhasználók (feltételezzük, hogy ezek az ID-k már léteznek az adatbázisban)
  const userIds = [1, 2, 3, 4, 5];
  const studentIds = [3, 6, 8]; // Csak diákok ID-i
  const portaIds = [4, 11]; // Csak portások ID-i

  // EntryExitEvent események
  const entryExitEvents = [
    { userId: 1, action: 'kiment', timestamp: new Date() },
    { userId: 1, action: 'bejött', timestamp: new Date() },
    { userId: 2, action: 'kiment', timestamp: new Date() },
    { userId: 2, action: 'bejött', timestamp: new Date() },
    { userId: 3, action: 'kiment', timestamp: new Date() },
    { userId: 3, action: 'bejött', timestamp: new Date() },
    { userId: 4, action: 'kiment', timestamp: new Date() },
    { userId: 4, action: 'bejött', timestamp: new Date() },
    { userId: 5, action: 'kiment', timestamp: new Date() },
    { userId: 5, action: 'bejött', timestamp: new Date() },
  ];

  // SmokingEvent események
  const smokingEvents = [
    { userId: 1, startTime: new Date(), endTime: new Date(new Date().getTime() + 5 * 60 * 1000) },
    { userId: 2, startTime: new Date(), endTime: new Date(new Date().getTime() + 10 * 60 * 1000) },
    { userId: 3, startTime: new Date(), endTime: new Date(new Date().getTime() + 15 * 60 * 1000) },
    { userId: 4, startTime: new Date(), endTime: new Date(new Date().getTime() + 20 * 60 * 1000) },
    { userId: 5, startTime: new Date(), endTime: new Date(new Date().getTime() + 25 * 60 * 1000) },
    { userId: 1, startTime: new Date(), endTime: new Date(new Date().getTime() + 30 * 60 * 1000) },
    { userId: 2, startTime: new Date(), endTime: new Date(new Date().getTime() + 35 * 60 * 1000) },
    { userId: 3, startTime: new Date(), endTime: new Date(new Date().getTime() + 40 * 60 * 1000) },
    { userId: 4, startTime: new Date(), endTime: new Date(new Date().getTime() + 45 * 60 * 1000) },
    { userId: 5, startTime: new Date(), endTime: new Date(new Date().getTime() + 50 * 60 * 1000) },
  ];

  // Feltöltjük az EntryExitEvent eseményeket
  for (const event of entryExitEvents) {
    await prisma.entryExitEvent.create({
      data: {
        userId: event.userId,
        action: event.action,
        timestamp: event.timestamp,
      },
    });
  }

  // Feltöltjük a SmokingEvent eseményeket
  for (const event of smokingEvents) {
    await prisma.smokingEvent.create({
      data: {
        userId: event.userId,
        startTime: event.startTime,
        endTime: event.endTime,
      },
    });
  }

  console.log('Események sikeresen feltöltve!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });