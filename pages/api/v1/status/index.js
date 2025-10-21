import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString()
  const databaseVersion = await database.query("SHOW server_version");
  const databaseMaxConnections = await database.query("SHOW max_connections")
  const databaseOpennedConnections = await database.query("SELECT count(*)::int from pg_stat_activity WHERE datname='local_db'")
  
  response.status(200).json({ update_at: updateAt,
    dependencies:
      {
        database:{
          version:databaseVersion.rows[0].server_version,
          max_connections: Number(databaseMaxConnections.rows[0].max_connections),
          openned_connections: Number(databaseOpennedConnections.rows[0].count)
  }}});
}
export default status;
