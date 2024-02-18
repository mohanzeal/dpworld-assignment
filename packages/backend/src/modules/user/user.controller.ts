import {
  IPaginateResponse,
  IPaginationExtraOptions,
  SortOrder,
  extraOptions,
} from './../../types/common/types.js'
import { Types } from 'mongoose'

import { CatchError, IUser, ModelType, UserFields } from '../../types/index.js'
import { Request, Response } from 'express'
import lodash from 'lodash'
import { utils } from '../../utils/index.js'
import { userModule } from './index.js'
import { videStreamsModule } from '../video-streams/index.js'
import { imageFrameModule } from '../image-frames/index.js'
import mongoose, { Mongoose } from 'mongoose'
import { auditModule } from '../audit/index.js'

export const updateUser = async (req: Request, res: Response) => {
  const userDetails: IUser = req.body

  const { error } = userModule.validation.update.validate(userDetails, {
    abortEarly: false,
  })

  if (error) {
    console.log(error)
    return utils.ApiError.handle(new utils.BadRequestError(error?.message), res)
  }

  const filteredUserFields = lodash.omit(userDetails, ['_id', 'updatedAt'])
  try {
    const updatedUser = await userModule.model.UserModel.findByIdAndUpdate(
      userDetails._id,
      filteredUserFields,
      {
        new: true,
      }
    )

    if (!updatedUser) {
      return new utils.NotFoundResponse(
        res.__('api.user.updateUser.error')
      ).send(res)
    }

    return new utils.SuccessResponse(
      res.__('api.user.updateUser.success'),
      utils.sendDefaultField(ModelType.USER, updatedUser)
    ).send(res)
  } catch (e) {
    console.error(e)

    const catchError = e as CatchError
    let msg = res.__('api.common.error')
    if (catchError.name === 'CastError') {
      msg = 'Invalid User Id: ' + userDetails._id
    }

    return utils.ApiError.handle(new utils.BadRequestError(msg), res)
  }
}

export const getImagesByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  if (userId) {
    const userImages = await imageFrameModule.model.ImageFrames.find({
      userId: userId,
    }).sort({ createdAt: -1 })

    return res.send({
      success: true,
      images: userImages,
    })
  }
}

export const getVideosByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId
  if (userId) {
    const userVideos = await videStreamsModule.model.VideoStreams.find({
      userId: userId,
    }).sort({ createdAt: -1 })

    return res.send({
      success: true,
      images: userVideos,
    })
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const pageSize = parseInt((req.query.pageSize as string) || '5', 10)
    const current = parseInt((req.query.current as string) || '5', 10)
    const sortField = req.query.sortField
    const sortOrder = req.query.sortOrder as SortOrder
    const searchField = req.query.searchField
    const searchVal = req.query.searchVal
    const startDate = req.query.startDate
    const endDate = req.query.endDate

    let condition = {
      [UserFields.IS_DELETED]: false,
    } as any

    let moreOptions = undefined

    if (sortField && sortOrder) {
      moreOptions = {
        sort: {
          field: sortField as string,
          order: sortOrder,
        },
      }
    } else {
      moreOptions = {
        sort: {
          field: UserFields.CREATED_AT,
          order: SortOrder.DESC,
        },
      }
    }

    if (searchField && searchVal) {
      moreOptions = Object.assign(moreOptions, {
        search: {
          field: searchField as string,
          val: searchVal as string,
        },
      })
    }
    const convertDate = (dateString: string) => {
      // Split the date string into its components
      const [datePart, timePart] = dateString.split(' ')

      // Split the date part into year, month, and day
      const [year, month, day] = datePart.split('-').map(Number)

      // Split the time part into hour and minute
      const [hour, minute] = timePart.split(':').map(Number)

      // Create a new Date object using the components
      const dateObject = new Date(year, month - 1, day, hour, minute)

      return dateObject
    }

    if (startDate && endDate) {
      condition = Object.assign(condition, {
        createdAt: {
          $gte: convertDate(startDate as string),
          $lte: convertDate(endDate as string),
        },
      })
    }

    const allUsersList: IPaginateResponse<any> = await paginateUsersQuery(
      userModule.model.UserModel,
      condition,
      { __v: 0 },
      pageSize,
      current,
      moreOptions
    )

    return new utils.SuccessResponse('success', allUsersList).send(res)
  } catch (e) {
    console.error(e)
    return utils.ApiError.handle(
      new utils.BadRequestError('api.common.error'),
      res
    )
  }
}

export async function paginateUsersQuery<Type>(
  Model: mongoose.Model<Type>,
  query: mongoose.QueryOptions,
  fields: Record<string, number> = { __v: 0 },
  perPage: number,
  page: number,
  options: IPaginationExtraOptions = extraOptions
): Promise<IPaginateResponse<Type>> {
  const sortField = options?.sort?.field as string
  const sortOrder = options?.sort?.order === SortOrder.ASC ? 1 : -1

  query = Object.assign(query, {
    isDeleted: false,
  })

  if (options.filter && Object.keys(options.filter).length > 0) {
    query = Object.assign(query, {
      ...options.filter,
    })
  }

  if (options.search) {
    query = Object.assign(query, {
      [options.search.field]: {
        $regex: options.search.val,
        $options: 'i',
      },
    })
  }

  const data = await Model.aggregate([
    {
      $facet: {
        records: [
          { $match: query },
          { $sort: { [sortField]: sortOrder } },
          { $skip: perPage * (page - 1) },
          { $limit: perPage },
          {
            $project: fields,
          },
        ],
        totalCount: [{ $match: query }, { $count: 'totalCount' }],
      },
    },
  ])

  if (data && data.length > 0 && data[0].records.length > 0) {
    return {
      total: data[0]['totalCount'][0]['totalCount'],
      current: page,
      pageSize: perPage,
      sortField: sortField,
      sortOrder: String(sortOrder),
      searchField: options.search?.field as string,
      searchVal: options.search?.val as string,
      records: data[0]['records'],
    }
  } else {
    return {
      records: [],
      total: 0,
      sortField,
      sortOrder: '',
      searchField: '',
      searchVal: '',
      current: 0,
      pageSize: 0,
    }
  }
}

export const updateUserActions = async (req: Request, res: Response) => {
  const auditDetails: any = req.body

  const { error } = auditModule.validation.update.validate(auditDetails, {
    abortEarly: false,
  })

  if (error) {
    console.log(error)
    return utils.ApiError.handle(new utils.BadRequestError(error?.message), res)
  }

  try {
    const auditRecord = await auditModule.model.Audit.create({
      _id: new Types.ObjectId(),
      ...auditDetails,
    })

    return new utils.SuccessResponse('success', auditRecord).send(res)
  } catch (e) {
    console.error(e)

    const catchError = e as CatchError
    let msg = 'error'
    if (catchError.name === 'CastError') {
      msg = 'Invalid User Id: ' + auditDetails._id
    }

    return utils.ApiError.handle(new utils.BadRequestError(msg), res)
  }
}

export const getUserAuditLog = async (req: Request, res: Response) => {
  const userId = req.params.userId
  if (userId) {
    const auditLog = await auditModule.model.Audit.find({
      userId: userId,
    }).sort({ createdAt: -1 })

    return res.send({
      success: true,
      audit: auditLog,
    })
  }
}
