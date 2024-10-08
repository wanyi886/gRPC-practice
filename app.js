const express = require('express')
const server = require("./server");
const client = require("./client");

const app = express();
const port = process.env.PORT || 2100;

app.use(express.json());

app.get("/news", (req, res) => {
    client.getAllNews({}, (error, response) => {
        if (error) {
            console.error(error);
            res.status(500).json( { "Error": error.message })
        } else {
            res.json(response.news)
        }
    })
})

app.get("/news/:id", (req, res) => {
    client.getNews(
        {
            id: req.params.id
        }, 
        (error, response) => {
   
            if(error) {
                console.error( error);
                return res.status(500).json( { "Error": error.message })
            } 
            res.json(response)
            
        }
    )
})


app.post("/news", (req, res) => {
    const { title, body, postImage } = req.body;

    client.addNews(
        {
            title: title,
            body: body,
            postImage: postImage
        }, 
        (error, response) => {

            if(error) {
                console.error(error);
                return res.status(500).json( { "Error": error.message })
            } 
            
            res.json(response)
            
        }
    )
})

app.put("/news/:id", (req, res) => {
    const { title, body, postImage } = req.body;
    const id = req.params.id

    client.editNews(
        {   
            id: id,
            title: title,
            body: body,
            postImage: postImage
        }, 
        (error, response) => {

            if(error) {
                console.error(error);
                return res.status(500).json( { "Error": error.message })
            } 
            
            res.json(response)
            
        }
    )
})

app.delete("/news/:id", (req, res) => {
    client.deleteNews(
        {
            id: req.params.id
        }, 
        (error, response) => {

            if(error) {
                console.error('Error adding the news: ', error);
                return res.status(500).json( { "Error": error.message })
            } 
            
            res.json(response)
            
        }
    )
});



app.listen(port, () => {
    console.log(`HTTP server is running on port ${port}`)
})

