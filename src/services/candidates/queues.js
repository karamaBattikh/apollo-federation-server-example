import { reduce } from 'lodash'
import { redisSMQ } from '../../config/redisSMQ'
import Candidate from './models/Candidate'
import Queue from '../../lib/Queue'

export const initDeleteUserQueue = async () => {
  const deleteUserQueue = new Queue(redisSMQ, 'user_deleted')
  await deleteUserQueue.createQueue()
  return deleteUserQueue
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
        acc.push(doc.id)
        doc.remove()
        return acc
      },
      [],
    )
  })

  if (candidateList.length > 0) {
    deleteCandidateQueue.sendMessage(
      JSON.stringify({
        candidateListID: candidateList,
      }),
    )
  }
}
