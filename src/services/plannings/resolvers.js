import Planning from './models/planning'

const resolvers = {
  Query: {
    plannings: () => {
      return Planning.find({})
    },
    planning: async (_, { id }) => {
      const data = await Planning.findById(id)
      return data
    },
  },
  Mutation: {
    createPlanning: async (_, { input }) => {
      try {
        const newPlanning = Planning(input)
        const result = await newPlanning.save()
        return result
      } catch (err) {
        return err
      }
    },
    updatePlanning: async (_, { id, input }) => {
      const planning = await Planning.findById(id)
      if (!planning) return { messagge: 'Planning Not Found!' }
      try {
        const result = await Planning.findByIdAndUpdate(id, input)
        return result
      } catch (err) {
        // return err
        return 'Planning Not Found!'
      }
    },
    deletePlanning: async (_, { id }) => {
      const planning = await Planning.findById(id)
      if (!planning) return 'Planning Not Found!'
      try {
        await Planning.findByIdAndDelete(id)
        return 'The Planning was deleted successfully'
      } catch (err) {
        return err
      }
    },
  },
}

export default resolvers
