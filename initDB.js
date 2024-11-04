import readline from 'node:readline'
import connectMongoose from './lib/connectMongoose.js'
import Product from './models/Product.js'


const connection = await connectMongoose()
console.log('Connected to MongoDB:', connection.name)
const questionResponse = await ask('Are you sure you want to empty the database and create initial data?')
if (questionResponse.toLowerCase() !== 'yes') {
  console.log('Operation aborted.')
  process.exit()
}
await initProducts()
async function initProducts() {
  // delete all products
  const deleteResult = await Product.deleteMany()
  console.log(`Deleted ${deleteResult.deletedCount} products.`)
  // create initial products
  const insertResult = await Product.insertMany([
    { name: 'cafetera', price: 29.99 },
    { name: 'tostadora', price: 42.50 },
    { name: 'microondas', price: 23.70 }
  ])
  console.log(`Created ${insertResult.length} products.`)
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