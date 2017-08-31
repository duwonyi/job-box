const email = 'duwonyi@gmail.com'
const password = '123456'
const API_KEY = 'AIzaSyDMy7sLjcEfMGfiHmVXcbc1tuSyf8vEWJs'
const AUTH_URL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword'
const FIREBASE_URL = 'https://job-box-4f579.firebaseio.com'

let localId = ''
let idToken = ''

const getAppUrl = (resource) => (`${FIREBASE_URL}/${localId}/${resource}.json?auth=${idToken}`)

const apiClient = {
  login(cb) {
    fetch(`${AUTH_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        'email': email,
        'password': password,
        'returnSecureToken': true
      })
    })
    .then(response => response.json())
    .then(json => {
      localId = json.localId
      idToken = json.idToken
      cb({localId, idToken})
    })
  },
  getJobs(cb) {
    fetch(getAppUrl('jobs'))
      .then(response => response.json())
      .then(json => cb(json))
  },
  addJob(newJob, cb) {
    fetch(getAppUrl('jobs'), {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(newJob)
    })
    .then(response => response.json())
    .then(json => cb(json))
  },
  editJob(id, editJob, cb) {
    fetch(getAppUrl(`jobs/${id}`), {
      method: 'PATCH',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(editJob)
    })
    .then(response => response.json())
    .then(json => cb(json))
  },
  deleteJob(id, cb) {
    fetch(getAppUrl(`jobs/${id}`), {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then(response => response.json())
    .then(json => cb(json))
  },
}

export default apiClient