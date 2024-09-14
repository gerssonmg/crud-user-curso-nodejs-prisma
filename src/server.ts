import Fastify, { FastifyReply, FastifyRequest } from 'fastify'

const app = Fastify({
  logger: false,
})

const users = [
  { id: 1, name: 'Gerson', email: 'gerson@gmail.com' },
  { id: 2, name: 'Ana', email: 'ana@gmail.com' },
]

// Rota GET
app.get('/list-users', function (request, reply) {
  reply.send(users)
})

interface IUserBody {
  name: string
  email: string
}

interface IUserParams {
  id: number
}

app.post(
  '/create-user2',
  function (
    request: FastifyRequest<{
      Body: IUserBody
    }>,
    reply: FastifyReply,
  ) {
    console.log(request.body)
    const { name, email } = request.body

    users.push({
      id: users.length + 1,
      name,
      email,
    })
    reply.send('usuario criado com sucesso')
  },
)

app.put(
  '/update-user/:id',
  function (
    request: FastifyRequest<{ Body: IUserBody; Params: IUserParams }>,
    reply,
  ) {
    const { id } = request.params
    console.log(request.params)

    const { name, email } = request.body

    users[id - 1] = {
      id: id,
      name: name,
      email: email,
    }

    reply.send('usuario atualizado com sucesso')
  },
)

app.delete(
  '/delete-user/:id',
  function (request: FastifyRequest<{ Params: IUserParams }>, reply) {
    users.splice(request.params.id - 1, 1)

    reply.send()
  },
)

// Run the server!
app.listen({ port: 3000 }, function (err) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
