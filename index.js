const connectDB = require('./db/dbconnect')
const Book = require('./models/books.models')
const express = require('express')
const cors = require("cors");

const app = express()
app.use(express.json())
app.use(cors())

connectDB()

const  createnebook= async (newbook)=>{
    try{
        const book = new Book(newbook)
        const savedbook = await book.save()
        console.log(savedbook)
        return savedbook
    }catch(error){
        throw error
    }
}

app.post('/books', async (req,res)=>{
    try{
        const savedbook = await createnebook(req.body)
        if(savedbook){
            res.status(200).json({message:"Book is saved successfully ",savedbook})
        }else{
            res.status(404).json({error:"Book is not saved"})
        }
    }catch(error){
        res.status(404).json({error:"Error while fetching the book data "})
    }
})

const readallbook= async ()=>{
    try{
        const books = await Book.find()
        console.log(books)
        return books
    }catch(error){
        throw error
    }
}

app.get('/books', async(req,res)=>{
    try{
        const books = await readallbook()
        if(books.length > 0){
            res.status(200).json(books)
        }else{
            res.status(404).json({message:"No Book Found"})
        }

    }catch(error){
        res.status(404).json({error:"Error while fetching books"})
    }
})

const readbookbytitle = async(title)=>{
    try{
        const book = await Book.find({title:title})
        console.log(book)
        return book
    }catch(error){
        throw error
    }
}

app.get('/books/:title', async(req,res)=>{
    try{
        const book = await readbookbytitle(req.params.title)
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).json({message:"No Book Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error while fetching data"})
    }
})

const readbookbyauthor = async(author)=>{
    try{
        const book = await Book.find({author:author})
        console.log(book)
        return book
    }catch(error){
        throw error
    }
}

app.get('/books/author/:author', async(req,res)=>{
    try{
        const book = await readbookbyauthor(req.params.author)
        if(book){
            res.status(200).json(book)
        }else{
            res.status(404).json({message:"No Book Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error while fetching data"})
    }
})

const readbookbygenre = async(genre)=>{
    try{
        const book = await Book.find({genre:genre})
        console.log(book)
        return book
    }catch(error){
        throw error
    }
}

app.get('/books/genre/:genre', async(req,res)=>{
    try{
        // console.log(req.params.genre)
        const book = await readbookbygenre(req.params.genre)
        if(book){
            res.status(200).json({message:"Book successfully fetched :",book})
        }else{
            res.status(404).json({message:"No Book Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error while fetching data"})
    }
})

const readbookbypublishyear = async(year)=>{
    try{
        const book = await Book.find({publishedYear:year})
        console.log(book)
        return book
    }catch(error){
        throw error
    }
}

app.get('/books/publishyear/:year', async(req,res)=>{
    try{
        // console.log(req.params.genre)
        const book = await readbookbypublishyear(req.params.year)
        if(book){
            res.status(200).json({message:"Book successfully fetched :",book})
        }else{
            res.status(404).json({message:"No Book Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error while fetching data"})
    }
})

const updateratingById = async(bookId,parameter)=>{
    try{
        const book = await Book.findByIdAndUpdate(bookId,parameter,{new:true})
        console.log(book)
        return book
    }catch(error){
        throw error
    }
}

app.post('/books/:bookId', async(req,res)=>{
    try{
        const book = await updateratingById(req.params.bookId,req.body)
        if(book){
            res.status(200).json({message:"Book is updated :",book})
        }else{
            res.status(500).json({message:"Book not find"})
        }
    }catch(error){
        res.status(500).json({error:"Error while fetching data"})
    }
})

const deletedata = async(bookId)=>{
    try{
        const book = await Book.findByIdAndDelete(bookId)
        console.log(book)
        return book
    }catch(error){
        throw error
    }
}

app.delete('/books/:bookId', async(req,res)=>{
    try{
        const book = await deletedata(req.params.bookId)
        if(book){
            res.status(200).json({message:"Data is deleted successfully", book})
        }else{
            res.status(404).json({message:"Book Not Found"})
        }
    }catch(error){
        res.status(500).json({error:"Error while deleting data"})
    }
})


const PORT = 3000
app.listen(PORT, ()=>{
    console.log("Server is running on port : ",PORT)
})