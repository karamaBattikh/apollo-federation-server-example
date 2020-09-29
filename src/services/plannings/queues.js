import { redisSMQ } from '../../config/redisSMQ'
import Queue from '../../lib/Queue'
import Planning from './models/planning'

export const initDeleteCandidateQueue = async () => {
  const deleteInternshipQueue = new Queue(redisSMQ, 'candidate_deleted')
  await deleteInternshipQueue.createQueue()
  return deleteInternshipQueue
}

export const onDeleteCandidate = async (payload) => {
  const { candidateIdList } = JSON.parse(payload.message)
  await Planning.deleteMany({ candidate: { $in: candidateIdList } })
}
