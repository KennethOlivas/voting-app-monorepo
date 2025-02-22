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
  middleName: varchar('middle_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique(),
  voterId: varchar('voter_id', { length: 255 }).unique().notNull(),
  bornIn: varchar('born_in', { length: 255 }).notNull(),
  dateOfBirth: text('date_of_birth').notNull(),
  gender: varchar('gender').notNull(),
  city: varchar('city', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const parties = pgTable('parties', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  logoUrl: text('logo_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const candidates = pgTable('candidates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  partyId: uuid('party_id').references(() => parties.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const elections = pgTable('elections', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  status: text('status').default('pending'), // "pending", "active", "closed"
  createdAt: timestamp('created_at').defaultNow(),
});

export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  electionId: uuid('election_id')
    .notNull()
    .references(() => elections.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const campaignCandidates = pgTable('campaign_candidates', {
  id: uuid('id').defaultRandom().primaryKey(),
  campaignId: uuid('campaign_id')
    .notNull()
    .references(() => campaigns.id, { onDelete: 'cascade' }),
  candidateId: uuid('candidate_id')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  position: text('position').notNull(), // Cargo para el que compite
  createdAt: timestamp('created_at').defaultNow(),
});

export const votes = pgTable('votes', {
  id: uuid('id').defaultRandom().primaryKey(),
  voterId: uuid('voter_id')
    .notNull()
    .references(() => voters.id, { onDelete: 'cascade' }),
  campaignCandidateId: uuid('campaign_candidate_id')
    .notNull()
    .references(() => campaignCandidates.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: text('action').notNull(), // "vote_casted", "election_created", etc.
  details: text('details'),
  createdAt: timestamp('created_at').defaultNow(),
});
