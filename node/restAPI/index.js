var express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./src/routes/crmRoute');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

routes(app);

mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

const BlogSchema = require('./src/models/crmModel')
const blogModel = mongoose.model('blog', BlogSchema);

app.post('/newBlog', (req, res)=> {
    let blog = new blogModel(req.body)
    blog.save((err, blogModel) => {
        if (err) {
            res.send(err);
        }
        res.json(blog);
    })
})

let getAllBlogs = (req, res) => {
    blogModel.find({}, (err,blogs) => {
        if (err)
            res.send(err)
        else
            res.json(blogs);
    })
}

app.get('/getBlogs', getAllBlogs);

let getBlogById = (req, res) => {
    blogModel.findById((req.params.blogId), (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json(blog);
    })
}
app.get('/blog/:blogId', getBlogById)

let updateBlog = (req, res) => {
    blogModel.findOneAndUpdate({_id: req.params.blogId}, req.body, { new: true }, (err, updatedBlog) => {
        if (err) {
            res.send(err);
        }
        res.json(updatedBlog);
    })
}

app.put('/blog/:blogId', updateBlog);

let deleteBlog = (req, res) => {
    blogModel.remove({ _id: req.params.blogId }, (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Blog Deleted successfully'});
    })
}

app.delete('/blog/:blogId', deleteBlog);

app.use(express.static('public'))

app.listen(PORT, () => {{
    console.log(`Server is running on PORT: ${PORT}`)
}})
