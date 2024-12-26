import 'dotenv/config'
import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Product.js'
import User from './models/User.js'


const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)
const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
  console.log('Operation aborted.')
  process.exit()
}

await initUsers()
await initProducts()

connection.close()


async function initProducts() {
  // delete all products
  const deleteResult = await Product.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} products.`)


  //esta promesa hace que me reconozca los owner
  const [admin, user1, user2] = await Promise.all([
    User.findOne({ email: 'admin@example.com' }),
    User.findOne({ email: 'user1@example.com' }),
    User.findOne({ email: 'user2@example.com' }),
  ])

  // create initial products
  const insertResult = await Product.insertMany([
    { name: 'cafetera', price: 29.99, owner: admin._id, tags: ["lifestyle"]},
    { name: 'tostadora', price: 42.50, owner: user1._id, tags: ["work"]},
    { name: 'microondas', price: 23.70, owner: user2._id, tags: ["motor", "mobile"]}
  ])
  console.log(`Created ${insertResult.length} products.`)
}


async function initUsers() {
  // delete all users
  const deleteResult = await User.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} users.`)

  // create initial users
  const insertResult = await User.insertMany([
    { email: 'admin@example.com', password: await User.hashPassword('1234') },
    { email: 'user1@example.com', password: await User.hashPassword('1234') },
    { email: 'user2@example.com', password: await User.hashPassword('1234') }
  ])
  console.log(`Created ${insertResult.length} users.`)
}



function ask(questionText) {
  return new Promise((resolve, reject) => {
    const consoleInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    consoleInterface.question(questionText, answer => {
      consoleInterface.close()
      resolve(answer)
    })
  })
}