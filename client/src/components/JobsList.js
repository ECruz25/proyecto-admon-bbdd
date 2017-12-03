import React, { Component } from 'react';
import Job from './Job';

class JobsList extends Component {
  constructor() {
    super();
    this.state = {
      newJobs: {},
      jobsInfo: {}
    };
  }

  componentDidMount() {
    fetch(`/connection/getConnections/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(jobs => {
        const tempJobs = {};
        const jobsInfo = {};
        const jobsNames = jobs.map(job => {
          const jobId = job.jobId;
          tempJobs[jobId] = {};
          jobsInfo[jobId] = { jobName: job.jobName };
        });
        jobs.map(job => {
          const jobId = job.jobId;
          const instanceId = job.instanceId;
          tempJobs[jobId][instanceId] = { ...job };
        });
        Object.keys(tempJobs).map(key => {
          Object.keys(tempJobs[key]).sort((a, b) => {
            const job1 = tempJobs[key][a].runDate;
            const job2 = tempJobs[key][b].runDate;
            return job1 - job2;
          });
        });
        console.log(jobsInfo);
        this.setState({ jobsInfo, newJobs: tempJobs });
      });
  }

  render() {
    return (
      <div className="jobslist mb-3">
        <h1> Jobs </h1>
        <div className="row justify-content-around">
          {Object.keys(this.state.newJobs).map(key => (
            <Job
              key={key}
              job={this.state.newJobs[key]}
              jobInfo={this.state.jobsInfo[key]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default JobsList;
