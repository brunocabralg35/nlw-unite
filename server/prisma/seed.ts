import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "22ef5b56-0ee0-4729-aeab-e906c3dcceb5",
      title: "Crazy Event",
      slug: "crazy-event",
      details: "Craziest event on earth",
      maximumAttendees: 100,
    },
  });
}

seed().then(() => {
  console.log("Database seeded!");
  prisma.$disconnect();
});
