import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("password123", 10);

  // create user
  const user = await prisma.user.upsert({
    where: { email: "test@dianketv.com" },
    update: {},
    create: {
      username: "dianke",
      email: "test@dianketv.com",
      password: hashed
    }
  });

  // create posts
  await prisma.post.createMany({
    data: [
      {
        slug: "lancer-un-potager",
        title: "Lancer un potager rentable au village",
        excerpt: "Comment démarrer un potager rentable avec peu de moyens.",
        content: "Contenu complet de l’article sur le potager...",
        tags: "potager,agriculture"
      },
      {
        slug: "elevage-poulet",
        title: "Élevage de poulets pour débutants",
        excerpt: "Guide pratique pour débuter l’élevage.",
        content: "Contenu sur l'élevage de poulets...",
        tags: "élevage,poulet"
      }
    ]
  });

  console.log("Seeding done.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await (await import('@prisma/client')).PrismaClient.prototype.$disconnect.call(new (await import('@prisma/client')).PrismaClient()));
