import { pgTable, text, varchar, timestamp, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: text('password').notNull(),
  role: text('role').default('user'), // "admin" o "user"
  createdAt: timestamp('created_at').defaultNow(),
});

export const voters = pgTable('voters', {
  id: uuid('id').defaultRandom().primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  dateOfBirth: text('date_of_birth').notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const candidates = pgTable('candidates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  party: varchar('party', { length: 255 }).notNull(),
  position: text('position').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const elections = pgTable('elections', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const votes = pgTable('votes', {
  id: uuid('id').defaultRandom().primaryKey(),
  voterId: uuid('voter_id')
    .notNull()
    .references(() => voters.id, { onDelete: 'cascade' }),
  candidateId: uuid('candidate_id')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  electionId: uuid('election_id')
    .notNull()
    .references(() => elections.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});
