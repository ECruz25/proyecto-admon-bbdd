const mongoose = require('mongoose');
const Connection = require('../models/Connection');
const promisify = require('es6-promisify');

exports.register = async (req, res) => {
  console.log('entroo');
  console.log(req.body.form);
  const connection = new Connection({
    connectionName: req.body.form.connectionName,
    client: req.body.form.client,
    username: req.body.form.username,
    database: req.body.form.database,
    password: req.body.form.password
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
      createMySQLConnection(connection, res);
      break;
    default:
      console.log('No entro');
      break;
  }

  // console.log(req.params);
  // res.json(connection);
};

const createMSSQLConnection = (connection, res) => {
  const knex = require('knex')({
    client: 'mssql',
    connection: {
      server: `localhost\\${connection.connectionName}`,
      database: `master`,
      user: `${connection.username}`,
      password: `${connection.password}`,
      port: 1443
    }
  });
  // knex
  //   .select(
  //     { instanceId: 'instance_id' },
  //     { jobId: 'job_id' },
  //     { stepName: 'step_name' },
  //     'message',
  //     {
  //       status: 'run_status'
  //     },
  //     { runDate: 'run_date' },
  //     { runTime: 'run_time' }
  //   )
  //   .from('msdb.dbo.sysjobhistory')
  //   .orderBy('run_time')
  //   .then(selection => {
  //     res.json(selection);
  //   });
  knex('msdb.dbo.sysjobs')
    .join(
      'msdb.dbo.sysjobhistory',
      'msdb.dbo.sysjobs.job_id',
      '=',
      'msdb.dbo.sysjobhistory.job_id'
    )
    .select(
      { jobName: 'name' },
      { instanceId: 'instance_id' },
      { jobId: 'msdb.dbo.sysjobhistory.job_id' },
      { stepName: 'step_name' },
      'message',
      {
        status: 'run_status'
      },
      { runDate: 'run_date' },
      { runTime: 'run_time' }
    )
    .then(selection => {
      res.json(selection);
    });
};

const createMySQLConnection = (connection, res) => {
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: `root`,
      password: 'root',
      database: 'mydb'
    }
  });
  knex
    .select('*')
    .from('INFORMATION_SCHEMA.events')
    .then(selection => {
      res.json(selection);
    });
};

const createPOSTGRESQLConnection = (connection, res) => {
  const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: `root`,
      password: 'root',
      database: 'mydb'
    }
  });
};

exports.createMSSQLConnection;
