import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const hashedPasswordAdmin = await argon2.hash('adminpassword');
  const hashedPasswordTeacher = await argon2.hash('teacherpassword');
  const hashedPasswordStudent = await argon2.hash('studentpassword');
  const hashedPasswordPorta = await argon2.hash('portapassword');

  // Admin létrehozása
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      role: 'ADMIN',
    },
  });

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPasswordAdmin,
      userId: adminUser.id,
    },
  });

  // Teacher létrehozása
  const teacherUser = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      password: hashedPasswordTeacher,
      role: 'TEACHER',
    },
  });

  const teacher = await prisma.teacher.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      name: 'Teacher User',
      class: '10A',
      email: 'teacher@example.com',
      password: hashedPasswordTeacher,
      userId: teacherUser.id,
    },
  });

  // Student létrehozása
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: hashedPasswordStudent,
      role: 'STUDENT',
    },
  });

  const student = await prisma.student.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      name: 'Student User',
      class: '10A',
      classTeacherId: teacher.id,
      birthDate: new Date('2005-01-01'),
      studentCardNumber: '123456789',
      email: 'student@example.com',
      password: hashedPasswordStudent,
      userId: studentUser.id,
    },
  });

  // Porta létrehozása
  const portaUser = await prisma.user.upsert({
    where: { email: 'porta@example.com' },
    update: {},
    create: {
      email: 'porta@example.com',
      password: hashedPasswordPorta,
      role: 'PORTA',
    },
  });

  const porta = await prisma.porta.upsert({
    where: { email: 'porta@example.com' },
    update: {},
    create: {
      name: 'Porta User',
      email: 'porta@example.com',
      password: hashedPasswordPorta,
      userId: portaUser.id,
    },
  });

  console.log({ admin, teacher, student, porta });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });