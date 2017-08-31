import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

const JobReadView = ({open, onClose, onEdit, onDelete, job}) => (
  <Dialog
    title="Job"
    actions={[
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={onClose}
      />,
      <FlatButton
        label="Edit"
        primary={true}
        onClick={() => {
          onClose()
          onEdit()
        }}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={() => {
          onClose()
          onDelete()
        }}
      />,
    ]}
    open={open}
    modal={false}
    onRequestClose={onClose}
  >
    { job !== null &&
      <div>
        <div><strong>Employer:</strong> {job.employer}</div>
        <hr></hr>
        <div><strong>Position:</strong> {job.position}</div>
        <hr></hr>
        <div><strong>Status:</strong> {job.status}</div>
        <hr></hr>
        <div><strong>Url:</strong> {job.url}</div>
      </div>
    }
  </Dialog>
)

export default JobReadView