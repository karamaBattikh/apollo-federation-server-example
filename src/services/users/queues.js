import { redisSMQ } from '../../config/redisSMQ'
import Queue from '../../lib/Queue'
import User from './models/User'

// new Queue object
export const initDeleteUserQueue = async () => {
  const deleteUserQueue = new Queue(redisSMQ, 'user_deleted')
  // creates the queue
  await deleteUserQueue.createQueue()
  // returns the new Queue object
  return deleteUserQueue
}

export const initDeleteCandidateQueue = async () => {
  const deleteCandidateQueue = new Queue(redisSMQ, 'candidate_deleted')
  await deleteCandidateQueue.createQueue()
  return deleteCandidateQueue
}

export const onDeleteCandidate = async (payload) => {
  const { candidateId } = JSON.parse(payload.message)
  const doc = await User.find({ candidates: { candidateId } })
  console.log('onDeleteCandidate -> doc', doc)
  // console.log('onDeleteCandidate -> payload', payload)
}
