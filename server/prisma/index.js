const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('💫 seed executing ...');

  // カテゴリデータ
  await prisma.category.deleteMany()
  await prisma.category.createMany({
    data: [
      {id:1, name: '仕事'},
      {id:2, name: 'プライベート'},
      {id:3, name: '趣味'},
    ],
  });
  
  // TODOのtaskデータ
  await prisma.task.deleteMany()
  await prisma.task.create({
      data: {
          id: 1,
          title: '犬の散歩',
          description: '二子玉の河川敷まで行く！',
          categoryId: 2,
      }
  })

  console.log('💫 seed finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })