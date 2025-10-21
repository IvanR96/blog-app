import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

let posts = [];

app.get("/", (req,res)=>{
    res.render("index.ejs", {posts});
});


app.post('/new', (req,res) =>{

    const {title, content} = req.body;
    const id = Date.now().toString();
    posts.push({id, title, content});
    res.redirect('/')
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.render('edit.ejs', { post }); // <-- pass post to EJS
});

app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});


app.post('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send('Post not found');

  post.title = req.body.title;
  post.content = req.body.content;

  res.redirect('/');
});



app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});


