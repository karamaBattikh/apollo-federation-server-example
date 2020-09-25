const resolvers = {
  Candidate: {
    __resolveReference: async (reference, { dataSources }) => {
      return dataSources.candidatesAPI.getCandidateByID(reference.id)
    },
    student(candidate) {
      return { __typename: 'User', id: candidate.student }
    },
    internship(candidate) {
      return { __typename: 'Internship', id: candidate.internship }
    },
  },
  User: {
    async candidates(user, args, { dataSources }) {
      const list = await dataSources.candidatesAPI.getCandidateByStudent(
        user.id,
      )
      return list
    },
  },
  Internship: {
    async candidates(internship, args, { dataSources }) {
      const list = await dataSources.candidatesAPI.getCandidateByInternship(
        internship.id,
      )
      return list
    },
  },
  Query: {
    candidates: async (_, arg, { dataSources }) => {
      return dataSources.candidatesAPI.getAllCandidate()
    },
    candidate: async (_, { id }, { dataSources }) => {
      return dataSources.candidatesAPI.getCandidateByID(id)
    },
  },
  Mutation: {
    createCandidate: async (_, { input }, { dataSources }) => {
      return dataSources.candidatesAPI.createCandidate(input)
    },
    updateCandidate: async (_, { id, input }, { dataSources }) => {
      return dataSources.candidatesAPI.updateCandidate(id, input)
    },
    deleteCandidate: async (_, { id }, { dataSources, queues }) => {
      await queues.deleteCandidateQueue.sendMessage(
        JSON.stringify({ candidateId: id }),
      )
      // return dataSources.candidatesAPI.deleteCandidate(id)
    },
  },
}

export default resolvers
