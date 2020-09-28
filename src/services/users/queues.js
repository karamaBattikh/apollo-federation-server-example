import { redisSMQ } from '../../config/redisSMQ'
import Queue from '../../lib/Queue'

// new Queue object
const initDeleteUserQueue = async () => {
  const deleteUserQueue = new Queue(redisSMQ, 'user_deleted')
  // creates the queue
  await deleteUserQueue.createQueue()
  // returns the new Queue object
  return deleteUserQueue
}

export default initDeleteUserQueue
