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

export const initDeleteCandidateQueue = async () => {
  const deleteCandidateQueue = new Queue(redisSMQ, 'candidate_deleted')
  await deleteCandidateQueue.createQueue()
  return deleteCandidateQueue
}

export const onDeleteUser = async (payload, deleteCandidateQueue) => {
  const { userId } = JSON.parse(payload.message)
  let candidateList = []

  await Candidate.find({ student: userId }, (err, docs) => {
    candidateList = reduce(
      docs,
      (acc, doc) => {
        if (doc.status === 'final_acceptance') acc.push(doc.id)
        doc.remove()
        return acc
      },
      [],
    )
    if (candidateList.length > 0) {
      deleteCandidateQueue.sendMessage(
        JSON.stringify({ candidateIdList: candidateList }),
      )
    }
  })
}

export const onDeleteInternship = async (payload, deleteCandidateQueue) => {
  const { internshipId } = JSON.parse(payload.message)
  let candidateList = []

  await Candidate.find({ internship: internshipId }, (err, docs) => {
    candidateList = reduce(
      docs,
      (acc, doc) => {
        if (doc.status === 'final_acceptance') acc.push(doc.id)
        doc.remove()
        return acc
      },
      [],
    )
    if (candidateList.length > 0) {
      deleteCandidateQueue.sendMessage(
        JSON.stringify({ candidateIdList: candidateList }),
      )
    }
  })
}
