const { promisify } = require('util');
const stream = require('stream');
const copyFrom = require('pg-copy-streams').from;
const pipeline = promisify(stream.pipeline);
const knex = require('knex');

async function copyToTable(txOrKnex, tableName, readableStream) {
  const knexClient = await (txOrKnex.trxClient || txOrKnex.client);
  const pgClient = await knexClient.acquireConnection();
  try {
    await pipeline(
      readableStream,
      pgClient.query(
        copyFrom(`COPY ${tableName}  FROM STDIN WITH (FORMAT csv)`)
      )
    );
  } finally {
    // Ensure that the pgClient is released once the pipeline completes
    await knexClient.releaseConnection(pgClient);
  }
}

module.exports.copyToTable = copyToTable;
