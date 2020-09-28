import { reduce } from 'lodash'
import { redisSMQ } from '../../config/redisSMQ'
import Queue from '../../lib/Queue'
import Candidate from './models/Candidate'

export const initDeleteUserQueue = async () => {
  const deleteUserQueue = new Queue(redisSMQ, 'user_deleted')
  await deleteUserQueue.createQueue()
  return deleteUserQueue
}

export const initDeleteInternshipQueue = async () => {
  const deleteInternshipQueue = new Queue(redisSMQ, 'internship_deleted')
  await deleteInternshipQueue.createQueue()
  return deleteInternshipQueue
}

export const onDeleteUser = async (payload) => {
  const { userId } = JSON.parse(payload.message)
  let candidateList = []

  await Candidate.find({ student: userId }, (err, docs) => {
    candidateList = reduce(
      docs,
      (acc, doc) => {
        acc.push(doc.id)
        doc.remove()
        return acc
      },
      [],
    )
    console.log('onDeleteUser -> candidateList', candidateList)
  })
}

export const onDeleteInternship = async (payload) => {
  const { internshipId } = JSON.parse(payload.message)

  await Candidate.deleteMany({ internship: internshipId })
}
