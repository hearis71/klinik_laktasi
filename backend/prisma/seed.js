const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Hash password admin
  const hashedPassword = await bcrypt.hash("admin", 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@kliniklaktasi.id" },
    update: {},
    create: {
      email: "admin@kliniklaktasi.id",
      nama: "Administrator",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("✅ Admin user created/updated:");
  console.log(`   Email: ${admin.email}`);
  console.log(`   Nama: ${admin.nama}`);
  console.log(`   Role: ${admin.role}`);
  console.log(`   Password: admin`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
