import { Request, Response } from 'express'
import { UsersModel } from '../../../models/user_model'
import cloudinary from '../../../middleware/Cloudinary'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

async function getUsers(req: Request, res: Response) {
  const { q } = req.query

  if ( !q ) {
    const users = await UsersModel.query()
    return res.status(200).json(users)
  }
  const users = await UsersModel
    .query()
    .whereLike('username', `%${q}%`)

  return res.status(200).json(users)
}

async function getUserByID(req: Request, res: Response) {
  const { id } = req.params

  try {
    const users = await UsersModel.query().findById(id).throwIfNotFound()

    return res.status(200).json(users)
  } catch (error) {
    return res.status(404).send('Data tidak ditemukan')
  }

}

async function addUser(req: Request, res: Response) {
  if(!req.body) {
    return res.status(400).send('Invalid Request')
  }

  const fileBase64 = req.file?.buffer.toString("base64")
  const file = `data:${req.file?.mimetype};base64,${fileBase64}`

  cloudinary.uploader.upload(file, async function(err: UploadApiErrorResponse, result: UploadApiResponse) {
    if(!!err) {
      console.log(err)
      return res.status(400).send('Gagal upload files')
    }

    const users = await UsersModel.query().insert(
      {
        ...req.body,
        image: result.url
      }
    ).returning('*')
    return res.status(200).json(users)
  })

}

async function updateUser(req: Request, res: Response) {
  const { id } = req.params

  if (!req.file) {
    try {
      const users = await UsersModel
        .query()
        .where({ id })
        .patch(req.body)
        .throwIfNotFound()
        .returning("*")

      return res.status(200).send('Data berhasil di update')
    } catch (error) {
      return res.status(404).send('Data tidak ditemukan')
    }
  }

  const fileBase64 = req.file.buffer.toString("base64")
  const file = `data:${req.file.mimetype};base64,${fileBase64}`


  cloudinary.uploader.upload(file, async function(err: UploadApiErrorResponse, 
    result:UploadApiResponse) {
      if (err) {
        console.log(err)
        return res.status(400).send('Gagal upload file')
      }

      try {
        const users = await UsersModel
          .query()
          .where({ id })
          .patch({
            ...req.body,
            profile_img: result.url
          })
          .throwIfNotFound()
          .returning('*')

        return res.status(404).send('Data berhasil di update')
      } catch (error) {
        return res.status(404).send('Data tidak ditemukan')
      }
    })
}

async function deleteUser(req: Request, res: Response) {
  const { id } = req.params

  try {
    UsersModel
      .query()
      .deleteById(id)
      .throwIfNotFound()
      .then(() => res.status(200).send("Data berhasil di hapus"))
      .catch

  } catch (error) {
    return res.status(404).send('Data tidak ditemukan')
  }



}

export default {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser
}