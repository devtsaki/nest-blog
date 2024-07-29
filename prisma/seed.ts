import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  const adminPassword = await bcrypt.hash('admin123', roundsOfHashing);
  const tsakPassword = await bcrypt.hash('tsak123', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: { password: adminPassword },
    create: {
      email: 'admin@admin.com',
      name: 'Admin Admin',
      password: adminPassword,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'tsak@tsak.com' },
    update: { password: tsakPassword },
    create: {
      email: 'tsak@tsak.com',
      name: 'Tsak Tsak',
      password: tsakPassword,
    },
  });

  const post1 = await prisma.post.upsert({
    where: { title: 'A third fancy title for post' },
    update: { authorId: user1.id },
    create: {
      title: 'A third fancy title for post',
      body: 'This is the body of my first blog post',
      description: 'This is the description of my first blog post',
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { title: 'A fancy title for my fourth post' },
    update: { authorId: user2.id },
    create: {
      title: 'A fancy title for my fourth post',
      body: 'This is the body of my second blog post',
      description: 'This is the description of my second blog post',
      published: true,
      authorId: user2.id,
    },
  });

  console.log({ user1, user2, post1, post2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
