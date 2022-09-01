import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany({});
    await prisma.post.deleteMany({});

    const user = await prisma.user.create({
        data: {
            email: 'teste@gmail.com',
            name: 'Diones',
            age: 31
        }
    });

    const post = await prisma.post.create({
        data: {
            title: 'Post de teste criado via seed',
            body: 'Este é um post de teste...',
            authorId: user.id
        }
    });
}

main();