import { UserStatus } from '../user/constants'

export type CatchError = {
  code: number
  message: string
  name: string
  response?: any
}

export type IApiResponse<T> = {
  statusCode: string
  message: string
  data: T
}

export type IPaginationFields = {
  current: number
  pageSize: number
  sortField: string
  sortOrder: string
  searchField: string
  searchVal: string
  filter?: Record<string, string>
}

export type IPaginateResponse<T> = IPaginationFields & {
  total: number
  records: T[]
}

export type ISort = {
  field: string
  order: SortOrder
}

export type IPaginationExtraOptions = {
  sort?: ISort
  search?: {
    field: string
    val: string
  }
  status?: UserStatus
  filter?: Record<string, string>
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const extraOptions: IPaginationExtraOptions = {
  sort: {
    field: 'updatedAt',
    order: SortOrder.DESC,
  },
}
