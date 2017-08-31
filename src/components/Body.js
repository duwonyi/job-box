import React, { Component } from 'react'
import apiClient from '../apiClient'
import JobReadView from './JobReadView'
import JobAddandEditView from './JobAddandEditView'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'

class Body extends Component {
  style = {
    position: 'fixed',
    bottom: 10,
    right: 15,
  }

  componentDidMount() {
    apiClient.login(json => {
      apiClient.getJobs(json => {
        if (json !== null) {
          const jobs = Object.keys(json)
            .map((key, index) => {
              json[key].id = key
              return json[key]
            })
          this.setState({jobs})
        }
      })
    })
  }

  state = {
    mode: '', //Add or Edit
    popupOpen: false,
    viewPopupOpen: false,
    currentJobIndex: -1,
    currentJob: null,
    fields: {
      employer:  '',
      position: '',
      status: '',
      url: '',
      id: '',
    },
    jobs: [],
  }

  handleOpen = (name) => {
    this.setState({[name]: true})
  }

  handleClose = (name) => {
    this.setState({[name]: false})
  }

  handleRowSelection = (index) => {
    this.setState({
      'currentJob': this.state.jobs[index[0]],
      'currentJobIndex': index[0],
    })
    this.handleOpen('viewPopupOpen')
  }

  onInputChange = ({ name, value }) => {
    const fields = this.state.fields
    fields[name] = value
    this.setState({ fields })
  }

  addJob = () => {
    let { fields } = this.state
    const newJob = {
      'employer': fields.employer,
      'position': fields.position,
      'status': fields.status,
      'url': fields.url,
    }
    apiClient.addJob(newJob, json => {
      newJob.id = json.name
      const jobs = this.state.jobs.concat(newJob)
      fields = {
        employer:  '',
        position: '',
        status: '',
        url: '',
        id: '',
      }
      this.setState({ jobs, fields })
    })
  }

  editJob = () => {
    let { fields, currentJobIndex } = this.state
    const editJob = {
      'employer': fields.employer,
      'position': fields.position,
      'status': fields.status,
      'url': fields.url,
    }
    apiClient.editJob(fields.id, editJob, json => {
      const jobs = [...this.state.jobs]
      jobs[currentJobIndex] = fields
      fields = {
        employer:  '',
        position: '',
        status: '',
        url: '',
        id: '',
      }
      this.setState({
        jobs,
        fields,
        currentJob: null,
        currentJobIndex: -1,
      })
    })
  }

  deleteJob = () => {
    const { id } = this.state.currentJob
    apiClient.deleteJob(id, (json => {
      const targetIndex = this.state.currentJobIndex
      const jobs = this.state.jobs.filter((job, i) => {
        return i !== targetIndex
      })
      this.setState({
        jobs,
        currentJob: null,
        currentJobIndex: -1,
      })
    }))
  }

  renderJobsTable() {
    const { jobs } = this.state
    return (
      jobs.map((job, index) => (
        <TableRow key={job.id}>
          <TableRowColumn>{job.employer}</TableRowColumn>
          <TableRowColumn>{job.position}</TableRowColumn>
          <TableRowColumn>{job.status}</TableRowColumn>
        </TableRow>
      ))
    )
  }

  render() {
    return (
      <div>
        <Table
          onRowSelection={this.handleRowSelection}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Employer</TableHeaderColumn>
              <TableHeaderColumn>Position</TableHeaderColumn>
              <TableHeaderColumn>Status</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
          {this.renderJobsTable()}
          </TableBody>
        </Table>
        <FloatingActionButton
          secondary={true}
          style={this.style}
          onClick={() => {
            this.setState({'mode': 'Add'})
            this.handleOpen('popupOpen')
          }}
        >
          <ContentAdd />
        </FloatingActionButton>
        <JobAddandEditView
          mode={this.state.mode}
          open={this.state.popupOpen}
          onClose={() => this.handleClose('popupOpen')}
          job={this.state.currentJob}
          fields={this.state.fields}
          onChange={this.onInputChange}
          onAddJob={this.addJob}
          onEditJob={this.editJob}
        />
        <JobReadView
          open={this.state.viewPopupOpen}
          onClose={() => this.handleClose('viewPopupOpen')}
          onEdit={() => {
            this.setState({
              fields: this.state.currentJob,
              mode: 'Edit',
            })
            this.handleOpen('popupOpen')
          }}
          onDelete={() => {
            this.deleteJob()
          }}
          job={this.state.currentJob}
        />
      </div>
    )
  }
}

export default Body