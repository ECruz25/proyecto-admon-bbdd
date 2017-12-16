const Connection = require('../models/Connection');

exports.register = async (req, res) => {
  const connection = new Connection({
    connectionName: req.body.form.connectionName,
    client: req.body.form.client,
    username: req.body.form.username,
    database: req.body.form.database,
    password: req.body.form.password,
  });
  connection.save((err, connection) => {
    if (err) {
      console.log(err);
    }
    console.log(connection);
  });
};

exports.getConnections = async (req, res) => {
  const connections = await Connection.find();
  // createMSSQLConnection(res);
  res.json(connections);
};

exports.getConnection = async (req, res) => {
  const connection = await Connection.findById(req.params.id);

  switch (connection.client) {
    case 'mssql':
      createMSSQLConnection(connection, res);
      break;
    case 'mysql':
      createMySQLConnection(connection, res);
      break;
    case 'pg':
      createPOSTGRESQLConnection(connection, res);
      break;
    default:
      console.log('No entro');
      break;
  }
};

const createMSSQLConnection = (connection, res) => {
  const knex = require('knex')({
    client: 'mssql',
    connection: {
      server: `localhost\\${connection.connectionName}`,
      database: `master`,
      user: `${connection.username}`,
      password: `${connection.password}`,
      port: 1443,
    },
  });
  knex('msdb.dbo.sysjobs')
    .join(
      'msdb.dbo.sysjobhistory',
      'msdb.dbo.sysjobs.job_id',
      '=',
      'msdb.dbo.sysjobhistory.job_id',
    )
    .select(
      { jobName: 'name' },
      { instanceId: 'instance_id' },
      { jobId: 'msdb.dbo.sysjobhistory.job_id' },
      { stepName: 'step_name' },
      'message',
      {
        status: 'run_status',
      },
      { runDate: 'run_date' },
      { runTime: 'run_time' },
    )
    .then(selection => {
      res.json(selection);
    })
    .catch(err => {
      console.log('error', err);
    });
};

const createMySQLConnection = (connection, res) => {
  console.log(connection);
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: `${connection.username}`,
      password: `${connection.password}`,
      database: 'sys',
    },
  });
  knex
    .select(
      { jobName: 'EVENT_NAME' },
      { jobId: 'EVENT_NAME' },
      { message: 'EVENT_DEFINITION' },
      { runDate: 'CREATED' },
    )
    .from('INFORMATION_SCHEMA.events')
    .then(selection => {
      res.json(selection);
    })
    .catch(err => {
      console.log('error', err);
    });
};

const createPOSTGRESQLConnection = (connection, res) => {
  const knex = require('knex')({
    client: 'pg',
    connection: {
      host: `${connection.connectionName}`,
      user: `${connection.username}`,
      password: `${connection.password}`,
      database: 'postgres',
    },
  });
  knex
    .select(
      { jobName: 'pgagent.pga_job.jobname' },
      { stepName: 'pgagent.pga_jobstep.jstname' },
      { status: 'pgagent.pga_jobsteplog.jslresult' },
      { runDate: 'pgagent.pga_jobsteplog.jslstart' },
    )
    .from('pgagent.pga_jobstep')
    .innerJoin(
      'pgagent.pga_job',
      'pgagent.pga_jobstep.jstjobid',
      'pgagent.pga_job.jobid',
    )
    .innerJoin(
      'pgagent.pga_jobsteplog',
      'pgagent.pga_job.jobid',
      'pgagent.pga_jobsteplog.jsljstid',
    )
    .then(selection => {
      res.json(selection);
      console.log(selection);
    })
    .catch(err => {
      console.log(err);
    });
};
