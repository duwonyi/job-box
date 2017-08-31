import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const handleChange = (evt, onChange) => {
  const name = evt.target.name
  const value = evt.target.value
  onChange({ name, value })
}

const handleSelectChange = (name, value, onChange) => {
  onChange({ name, value })
}

const JobAddandEditView = ({mode, open, onClose, fields, onChange, onAddJob, onEditJob}) => (
  <Dialog
    title={ 'Job ' + mode}
    actions={[
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={onClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onClick={() => {
          (mode === 'Add') ? onAddJob() : onEditJob()
          onClose()
        }}
      />,
    ]}
    modal={false}
    open={open}
    onRequestClose={onClose}
  >
    <TextField
      hintText="Employer"
      name='employer'
      value={fields.employer}
      onChange={evt => handleChange(evt, onChange)}
    /><br />
    <TextField
      hintText="Position"
      name='position'
      value={fields.position}
      onChange={evt => handleChange(evt, onChange)}
    /><br />
    <TextField
      hintText="URL"
      name='url'
      value={fields.url}
      onChange={evt => handleChange(evt, onChange)}
    /><br />
    <SelectField
      floatingLabelText="Status"
      name='status'
      value={fields.status}
      onChange={(evt, index, value) => handleSelectChange('status', value, onChange)} >
      <MenuItem value={'Posted'} primaryText="Posted" />
      <MenuItem value={'Applied'} primaryText="Applied" />
      <MenuItem value={'Interviewing'} primaryText="Interviewing" />
      <MenuItem value={'Interviewed'} primaryText="Interviewed" />
      <MenuItem value={'Failed'} primaryText="Failed" />
    </SelectField>
  </Dialog>
)

export default JobAddandEditView
