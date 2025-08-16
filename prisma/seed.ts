const { PrismaClient, Role } = require('@prisma/client');
const bcrypt = require('bcrypt');


const prisma = new PrismaClient()

async function main() {
  const adminPw = await bcrypt.hash('Admin@123', 10)
  const userPw  = await bcrypt.hash('User@123', 10)

  await prisma.user.upsert({
    where: { email: 'admin@altf.com' },
    update: {},
    create: { email: 'admin@altf.com', password: adminPw, role: Role.admin },
  })

  await prisma.user.upsert({
    where: { email: 'user@altf.com' },
    update: {},
    create: { email: 'user@altf.com', password: userPw, role: Role.user },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
