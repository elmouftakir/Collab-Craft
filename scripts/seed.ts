const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Algorithm" },
        { name: "Data Analytics & Science" },
        { name: "Shell Navigation" },
        { name: "Networking" },
        { name: "Computer Science" },
        { name: "Sql & NoSQL Database" },
        { name: "Engineering" },
        { name: "Software" },
        { name: "Other" },
      ]
    });

    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();