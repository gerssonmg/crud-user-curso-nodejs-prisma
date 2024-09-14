import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

const app = Fastify({
  logger: false,
})

interface IUserBody {
  name: string
  email: string
}

interface IUserParams {
  id: number
}

// Rota GET
app.get('/list-users', function (request, reply) {
  prisma.user.findMany().then((result) => {
    reply.send(result)
  })
})

app.post(
  '/create-user',
  function (
    request: FastifyRequest<{
      Body: IUserBody
    }>,
    reply: FastifyReply,
  ) {
    console.log(request.body)
    const { name, email } = request.body

    prisma.user
      .create({
        data: {
          name: name,
          email: email,
        },
      })
      .then((result) => {
        reply.send(result)
      })
      .catch((error) => {
        reply.send(error)
        console.log('DEU ERROR no create')
      })
  },
)

app.put(
  '/update-user/:id',
  function (
    request: FastifyRequest<{ Body: IUserBody; Params: IUserParams }>,
    reply,
  ) {
    const { id } = request.params

    const { name, email } = request.body

    prisma.user
      .update({
        where: {
          id: Number(id),
        },
        data: {
          name: name,
          email: email,
        },
      })
      .then((result) => {
        reply.send(result)
      })
      .catch((error) => {
        reply.send(error)
      })
  },
)

app.delete(
  '/delete-user/:id',
  function (request: FastifyRequest<{ Params: IUserParams }>, reply) {
    prisma.user
      .delete({
        where: {
          id: Number(request.params.id),
        },
      })
      .then((result) => {
        reply.send(result)
      })
      .catch((error) => {
        reply.send(error)
      })
  },
)

// Run the server!
app.listen({ port: 3000 }, function (err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
