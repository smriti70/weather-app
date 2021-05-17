const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// setup handlebars and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Smriti Singh'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Smriti Singh'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        helpMessage:'Help is available 24*7',      
        name:'Smriti Singh',
        title:'help'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'Please enter the search term'});
    }

    geocode(req.query.address,(err,{latitude,longitude,place:location}={})=>{
        if(err){
            return res.send({error:err});
        }
        forecast(latitude,longitude,(err,forecastData)=>{
            if(err){
                return res.send({error:err});
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address
            });
        });
    });

    
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send('Please enter some search term!!!');
    }
    res.send({
        forecast:'I dont know',
        name:'faridabad'
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404 error',
        message: 'This help page does not exist!',
        name:'Smriti Singh'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        message: 'Page not found!',
        name:'Smriti Singh'
    });
});

app.listen(3000,()=>{
    console.log('Server is up on port 3000.');
});