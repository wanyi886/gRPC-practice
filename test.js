const client = require("./client");

client.getAllNews( {}, (error, news) => {
    if (error) console.error("Error fetching news:", error.message)
    
    console.log("Received all news: ", news)
})

client.getNews (
    {
        id: 1
    }, 
    (error, news) => {
        if (error) console.error("Error fetching news:", error.message)
    
        console.log("Received a news: ", news)
    }
)

client.addNews (
    {
        title: "Title 5",
        body: "Content 5",
        postImage: "Post image 5"
    },
    (error, news) => {
        if (error) console.error("Error fetching news:", error.message)
    
        console.log("Successfully added a news! Your news is here: ", news)
    }
)

client.editNews (
    {
        id: 3,
        title: "Updated content 3",
        body: "Updated content 3",
        postImage: "Updated Post image 3"
    }, 
    (error, news) => {
        if (error) console.error("Error fetching news:", error.message)
    
        console.log("Successfully updated a news! Now the news is like this", news)
    }
)

client.deleteNews (
    {
        id: 2
    }, 
    (error, news) => {
        if (error) console.error("Error fetching news:", error.message)
    
        console.log("Successfully deleted a news!")
    }
)

client.getAllNews( {}, (error, news) => {
    if (error) console.error("Error fetching news:", error.message)
    
    console.log("Received all news: ", news)
})