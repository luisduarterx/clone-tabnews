import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  //busca versao do banco de dados
  const databaseVersionQuery = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionQuery.rows[0].server_version;

  //busca maximo de conexoes do banco de dados
  const databaseMaxConnectionsQuery = await database.query(
    "SHOW max_connections",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsQuery.rows[0].max_connections;

  //busca numero de conexoes abertas com banco de dados

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenedConnectionsQuery = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname=$1;",
    values: [databaseName],
  });
  // `SELECT count(*)::int FROM pg_stat_activity WHERE datname='${databaseName}';`,
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsQuery.rows[0].count;
  console.log();

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opened_connections: databaseOpenedConnectionsValue,
      },
    },
  });
}

export default status;
