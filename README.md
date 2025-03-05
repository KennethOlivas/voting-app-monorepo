# Voting App Monorepo

## About this project

This project is a voting application structured as a monorepo. It uses ESLint and Prettier to maintain code quality and consistency, with Husky managing Git hooks for automated checks.

The main goal of this application is to provide a platform for managing elections. The app has the following modules:

- **users:** stores the information of admins and others.
- **voters:** represents the people that can vote in the election.
- **candidates:** represents the candidates of an election.
- **elections:** defines the available elections.
- **votes:** stores the votes casted in the elections.

This project is using **TypeScript**, **Next.js** for the Frontend, **NestJS** for the backend and **JWT** for authentication.

## Project Structure

- **apps/**: Contains the main applications of the project.
- **apps/backend**: NestJS application files.
- **apps/frontend**: NextJS application files.
- **docker-compose.yml**: Configuration file for Docker Compose.
- **package.json**: npm configuration file with dependencies and scripts.
- **pnpm-workspace.yaml**: pnpm configuration for managing the monorepo.
- **tsconfig.base.json**: Base TypeScript configuration.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [Docker](https://www.docker.com/) (to run services in containers)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/KennethOlivas/voting-app-monorepo.git
   cd voting-app-monorepo
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

## Usage

### Running the Application

To start the database using Docker Compose:

```bash
docker-compose up
# or
docker-compose up -D
```

### Running the Backend
**Make sure to create the .env in apps/backend following the .env.example file as a template**


```bash
pnpm --filter backend start:dev
# or
pnpm run front:dev
```

The application will be available at `http://localhost:3001`


If you get any issues regarding zod or schemas, run the following command:
```bash
pnpm run build:schemas
```

#### Creating a test user
Create the schema:

```bash
cd apps/backend
npx drizzle-kit push
pnpm --filter backend start:dev
# or
pnpm run back:dev
```

Now create a user in the users table through CLI or pgAdmin.
For the user password in the database, use [this website](https://bcrypt-generator.com/) to generate a Bcrypt hash for the password.

Now try to login sending a POST request to the /auth/login endpoint using the following body parameters:

```javascript
{
  "email": "myEmail@gmail.com",
  "password": "myPassword"
}
```

You should get the access_token as a response from the server.

### Running the Frontend

To start the Frontend:

```bash
pnpm --filter frontend dev  
```

The application will be available at `http://localhost:3000`

### Linting and Formatting

This project uses ESLint for static code analysis and Prettier for code formatting. Husky is configured to run these checks before each commit.

- **Run ESLint**:

  ```bash
  pnpm lint
  ```

- **Run Prettier**:

  ```bash
  pnpm format
  ```

### Adding packages

We are using pnpm workspaces, so you should install packages either per workspace or globally.

**Worskpaces**
- backend
- frontend

```bash
pnpm add <package_name> --filter=<name_workspace>

# Example
pnpm add @clerk/nextjs --filter=frontend
```

**Globally**
```bash
pnpm add <package_name>  -w
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork** the repository.
2. **Create** a new branch (`git checkout -b feature/new-feature`).
3. **Make** your changes and ensure they pass ESLint and Prettier checks.
4. **Commit** your changes (`git commit -m 'Add new feature'`).
5. **Push** your changes (`git push origin feature/new-feature`).
6. **Open** a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

