import { PrismaClient, Status, Priority } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Benutzer-Passwort hashen
  const hashedPassword = await bcrypt.hash('123456', 10);

  // Benutzer erstellen
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      email: 'john.doe@example.com',
      password: hashedPassword,
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      email: 'jane.smith@example.com',
      password: hashedPassword,
      name: 'Jane Smith',
    },
  });

  console.log('✅ Users created');

  // Beispiel-Todos für User 1 (John Doe)
  const todosUser1 = [
    {
      title: 'Wöchentlicher Einkauf',
      description: 'Lebensmittel für die Woche einkaufen: Milch, Brot, Obst, Gemüse',
      status: Status.NEW,
      priority: Priority.MEDIUM,
      tags: ['Einkaufen', 'Haushalt'],
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 Tage
    },
    {
      title: 'Projektpräsentation vorbereiten',
      description: 'PowerPoint-Folien erstellen und Präsentation üben für Montag',
      status: Status.OPEN,
      priority: Priority.HIGH,
      tags: ['Arbeit', 'Präsentation', 'Wichtig'],
      expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 Tage
      remindAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Reminder in 2 Tagen
    },
    {
      title: 'Zahnarzttermin vereinbaren',
      description: 'Kontrolltermin für nächsten Monat buchen',
      status: Status.NEW,
      priority: Priority.LOW,
      tags: ['Gesundheit', 'Termine'],
    },
    {
      title: 'Geburtstagsgeschenk kaufen',
      description: 'Geschenk für Mamas Geburtstag am Freitag besorgen',
      status: Status.OPEN,
      priority: Priority.URGENT,
      tags: ['Familie', 'Geschenke', 'Dringend'],
      expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 Tage
      remindAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Reminder morgen
    },
    {
      title: 'Auto waschen',
      description: 'Auto innen und außen reinigen',
      status: Status.COMPLETED,
      priority: Priority.LOW,
      tags: ['Auto', 'Haushalt'],
    },
    {
      title: 'Programmieren lernen',
      description: 'TypeScript Tutorial durcharbeiten - Kapitel 5-8',
      status: Status.OPEN,
      priority: Priority.MEDIUM,
      tags: ['Lernen', 'Programmierung', 'TypeScript'],
    },
    {
      title: 'Fitnessstudio besuchen',
      description: 'Cardio und Krafttraining - 1 Stunde',
      status: Status.COMPLETED,
      priority: Priority.MEDIUM,
      tags: ['Sport', 'Gesundheit'],
    },
  ];

  // Beispiel-Todos für User 2 (Jane Smith)
  const todosUser2 = [
    {
      title: 'Team-Meeting vorbereiten',
      description: 'Agenda erstellen und Teilnehmer informieren',
      status: Status.OPEN,
      priority: Priority.HIGH,
      tags: ['Arbeit', 'Meeting', 'Team'],
      expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Morgen
    },
    {
      title: 'Kochkurs buchen',
      description: 'Italienischer Kochkurs für Anfänger reservieren',
      status: Status.NEW,
      priority: Priority.LOW,
      tags: ['Hobby', 'Kochen', 'Lernen'],
    },
    {
      title: 'Steuererklärung abgeben',
      description: 'Alle Belege sammeln und Steuererklärung fertigstellen',
      status: Status.OPEN,
      priority: Priority.URGENT,
      tags: ['Steuern', 'Wichtig', 'Deadline'],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 Woche
      remindAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Reminder in 3 Tagen
    },
    {
      title: 'Buch zu Ende lesen',
      description: 'Die letzten 100 Seiten von "Clean Code" lesen',
      status: Status.OPEN,
      priority: Priority.LOW,
      tags: ['Lesen', 'Bildung', 'Programmierung'],
    },
    {
      title: 'Wohnung putzen',
      description: 'Große Wohnungsreinigung - Bad, Küche, Wohnzimmer',
      status: Status.NEW,
      priority: Priority.MEDIUM,
      tags: ['Haushalt', 'Putzen'],
    },
    {
      title: 'Code Review durchführen',
      description: 'Pull Request #47 reviewen und Feedback geben',
      status: Status.COMPLETED,
      priority: Priority.HIGH,
      tags: ['Arbeit', 'Code Review', 'Development'],
    },
  ];

  // Todos für User 1 erstellen
  for (const todoData of todosUser1) {
    await prisma.todo.create({
      data: {
        ...todoData,
        userId: user1.id,
      },
    });
  }

  // Todos für User 2 erstellen
  for (const todoData of todosUser2) {
    await prisma.todo.create({
      data: {
        ...todoData,
        userId: user2.id,
      },
    });
  }

  console.log('✅ Todos created');
  console.log(`📊 Created ${todosUser1.length} todos for ${user1.name}`);
  console.log(`📊 Created ${todosUser2.length} todos for ${user2.name}`);
  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });