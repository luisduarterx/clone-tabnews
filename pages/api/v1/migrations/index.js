import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  let dbClient;

  if (!allowedMethods.includes(request.method)) {
    return response
      .status(405)
      .json({ error: `Method ${request.method} not allowed` });
  }

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };
    if (request.method === "GET") {
      console.log(`Entrou no GET`);

      const pendingMigrations = await migrationRunner(defaultMigrationsOptions);

      return response.status(200).json(pendingMigrations);
    } else if (request.method === "POST") {
      console.log(`entrou no POST`);
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }
      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
  } finally {
    await dbClient.end();
  }
}
