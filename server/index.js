const express = require('express');
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vwpy9jc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const todoCollection = client.db('todoListDB').collection('todo')

    // get all todo list
    app.get('/todo', async(req,res) =>{
      const allTodo = todoCollection.find()
      const result = await allTodo.toArray() 
      res.send(result)
    })

    //  get a single todo
    app.get('/todo/:id', async(req, res) =>{
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const result = await todoCollection.findOne(query)
      res.send(result)
    })
    //  create a todo
    app.post('/todo', async(req,res)=>{
        const todo = req.body
        const result = await todoCollection.insertOne(todo)
        res.send(result)
    })
    // update todo
    app.put('/todo/:id', async(req, res) =>{
      const id = req.params.id;
      const todo = req.body
      const filter = {_id: new ObjectId(id)}
      const options = {upsert: true}
      const updateTodo = {
        $set:{
          todoName: todo.name
        }
      }
      const result = await todoCollection.updateOne(filter, updateTodo, options)
      res.send(result)

    })
    // delete a todo
    app.delete('/todo/:id', async(req, res) =>{
      const id  = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await todoCollection.deleteOne(query)
      res.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req, res) =>{
    res.send('Hello World')
})

app.listen(port, () =>{
    console.log(`Port is running on port ${port}`)
})
