# Voting App Monorepo

This project is a voting application structured as a monorepo. It uses ESLint and Prettier to maintain code quality and consistency, with Husky managing Git hooks for automated checks.

## Project Structure

- **apps/**: Contains the main applications of the project.
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

To start the application using Docker Compose:

```bash
docker-compose up
```

The application will be available at `http://localhost:5000` and results at `http://localhost:5001`.

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

