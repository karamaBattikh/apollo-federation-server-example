import { DataSource } from 'apollo-datasource'
import { omit } from 'lodash'

class CompanysDataSource extends DataSource {
  constructor(Company) {
    super()
    this.Company = Company
  }

  async getAllCompanys() {
    const list = await this.Company.find({})
    return list
  }

  async getCompanyByID(id) {
    const company = await this.Company.findById(id)
    if (!company) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Company Not Found!',
      }
    }
    return {
      __typename: 'Company',
      ...omit(company, '__v'),
    }
  }

  async createCompany(input) {
    const newCompany = this.Company(input)
    const result = await newCompany.save()
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in update Company!',
      }
    }
    return {
      __typename: 'Company',
      ...omit(result, '__v'),
    }
  }

  async updateCompany(id, input) {
    const company = await this.Company.findById(id)
    if (!company) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Company Not Found!',
      }
    }
    const result = await this.Company.findByIdAndUpdate(id, input)
    if (!result) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Error in update Company!',
      }
    }
    return {
      __typename: 'Company',
      ...omit(company, '__v'),
    }
  }

  async deleteCompany(id) {
    const company = await this.Company.findById(id)
    if (!company) {
      return {
        __typename: 'ErrorsMessage',
        errors: 'Company Not Found!',
      }
    }
    await this.Company.findByIdAndDelete(id)
    return {
      __typename: 'SuccessMessage',
      message: 'The Company was deleted successfully',
    }
  }
}

export default CompanysDataSource
