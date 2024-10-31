import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    // cria um client e e definido um objeto com os dados da conexao ao banco
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  await client.connect(); // se conecta ao client e espera a conecao ser feita usando await
  const result = await client.query(queryObject); // executa uma query dentro do client
  // result = aguarda a informacao utilizando await e guarda em result
  await client.end(); // aguarda o client finalizar
  return result;
}

export default {
  query: query,
};
