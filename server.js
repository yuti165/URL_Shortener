const express = require ('express')
const mongoose = require('mongoose')
const ShortUrl= require('./models/shortUrl')
const app =  express()

mongoose.connect('mongodb://localhost/urlShortener')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.set('view engine' , 'ejs')
app.use(express.urlencoded({extended: false}))

app.get('/' ,async (req,res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', { shortUrls: shortUrls})
})

app.post('/ShortUrls', async (req,res) =>{
   await ShortUrl.create({ full: req.body.fullUrl })

   res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})
app.delete('/api/urls', async (req, res) => {
  try {
      await ShortUrl.deleteMany({});
      res.status(200).send('All URLs deleted');
  } catch (err) {
      console.error('Error deleting URLs:', err);
      res.status(500).send('Server error');
  }
});

app.listen(process.env.PORT || 5000)