const express = require('express')
const app = express()
const { season1, season2, season3, season4, characters } = require('./data')

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/season1">season1</a>')
})
app.get('/api/season1', (req, res) => {
    const newSeason1 = season1.map((product) => {
        const { id, title, place, image, desc } = product
        return { id, title, place, image, desc }
    })

    res.json(newSeason1)
})
app.get('/api/season1/:season1ID', (req, res) => {
    //console.log(req)
    //console.log(req.params)
    const { season1ID } = req.params

    const singleEpisode = season1.find(
        (season1) => season1.id === Number(season1ID)
    )
    if(!singleEpisode){
        return res.status(404).send('Product Does Not Exist')
    }

    return res.json(singleEpisode)
})

app.get('/api/v1/query', (req,res) => {
    //console.log(req.query)
    //(query?search=fight)
    //(query?search=fight&limit=3)
    const { search, limit } = req.query
    let sortedSeason1 = [...season1]

    if(search){
        sortedSeason1 = sortedSeason1.filter((season1) => {
            return season1.desc.includes(search)
        })
    }
    if(limit){
        sortedSeason1 = sortedSeason1.slice(0 , Number(limit))
    }
    if(sortedSeason1.length < 1){
        //res.status(200).send('no products matched your search');
        return res.status(200).json({sucess: true, data: [] })
    }
    res.status(200).json(sortedSeason1)
})

app.listen(1234, () => {
    console.log('Server is lisenting on port 1234....')
})