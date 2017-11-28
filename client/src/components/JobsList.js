import React, { Component } from 'react';

class JobsList extends Component {
  constructor() {
    super();
    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    fetch(`/connection/getConnections/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(jobs => {
        this.setState({ jobs });
      });
  }

  render() {
    return (
      <div className="JobsList mb-3">
        <h1>connections</h1>
        <div className="row justify-content-around">
          {this.state.jobs.map(job => (
            <div
              key={job.instanceId}
              className={
                job.status === 1
                  ? 'success card col-3 m-1'
                  : 'fail card col-3 m-1'
              }
            >
              <div className="card-header">
                <h4 className={job.status === 1 ? '' : 'text-danger'}>
                  {job.stepName}
                </h4>
              </div>
              <div className="card-body">
                <p class="card-subtitle mb-2 text-muted">{job.jobId}</p>
                <p class="card-text">{job.message}</p>
                <p>{job.status === 1 ? 'Success' : 'Fail'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default JobsList;
