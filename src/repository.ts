import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query'],
})

console.log('Server aula prisma 01')

prisma.user
  .create({
    data: {
      name: 'Gerson2',
      email: 'gerson4@gmail.com',
    },
  })
  .then((result) => {
    console.log(result)
  })
  .catch(() => {
    console.log('DEU ERROR no create')
  })

/**
  prisma:query
  INSERT INTO `main`.`User` (`email`, `name`) 
  VALUES (?,?) 
  RETURNING `id` AS `id`, `email` AS `email`, `name` AS `name`
  { id: 2, email: 'gerson1@gmail.com', name: 'Gerson1' }
  */

prisma.user
  .delete({
    where: {
      email: 'gerson2@gmail.com',
    },
  })
  .then(() => {})
  .catch((error) => {
    console.log(error)
    console.log('DEU ERROR no DELETE 2')
  })

prisma.user
  .update({
    where: {
      email: 'gerson3@gmail.com',
    },
    data: {
      name: 'Gerson Atualizado',
    },
  })
  .then(() => {
    console.log('DEU CERTO O UPDATE')
  })

/**
prisma:query UPDATE `main`.`User` SET `name` = ? WHERE (`main`.`User`.`email` = ? AND 1=1) RETURNING `id` AS `id`, `email` AS `email`, `name` AS `name`
*/

prisma.user.findMany().then((result) => {
  result.forEach((user) => {
    if (user.email === 'gerson3@gmail.com') {
      console.log(user)
    }
  })
})

/**
prisma:query SELECT `main`.`User`.`id`,
  `main`.`User`.`email`, `main`.`User`.`name`
  FROM `main`.`User` WHERE 1=1 LIMIT ? OFFSET ?
*/

prisma.user.findFirst().then((aloaa) => {
  console.log('a')
})

const a = [1, 2, 3]

a.forEach((item) => {
  console.log(item)
})
