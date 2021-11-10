const express = require('express')
const app = express()
const { seasons, characters } = require('./data')

app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/seasons">seasons</a>')
})
app.get('/api/seasons', (req, res) => {
    const newSeasons = seasons.map((product) => {
        const { id, title, place, image, desc } = product
        return { id, title, place, image, desc }
    })

    res.json(newSeasons)
})
app.get('/api/seasons/:seasonsID', (req, res) => {
    //console.log(req)
    //console.log(req.params)
    const { seasonsID } = req.params

    const singleEpisode = seasons.find(
        (seasons) => seasons.id === Number(seasonsID)
    )
    if(!singleEpisode){
        return res.status(404).send('Product Does Not Exist')
    }

    return res.json(singleEpisode)
})

app.get('/api/characters', (req, res) => {
    const newCharacter = characters.map((product) => {
        const { id, title, place, image, desc } = product
        return { id, title, place, image, desc }
    })

    res.json(newCharacter)
})
app.get('/api/characters/:characterID', (req, res) => {
    //console.log(req)
    //console.log(req.params)
    const { characterID } = req.params

    const singleEpisode = characters.find(
        (characters) => characters.id === Number(characterID)
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
    let sortedSeasons = [...seasons]

    if(search){
        sortedSeasons = sortedSeasons.filter((seasons) => {
            return seasons.place.includes(search)
        })
    }
    if(limit){
        sortedSeasons = sortedSeasons.slice(0 , Number(limit))
    }
    if(sortedSeasons.length < 1){
        //res.status(200).send('no products matched your search');
        return res.status(200).json({sucess: true, data: [] })
    }
    res.status(200).json(sortedSeasons)
})

app.listen(1234, () => {
    console.log('Server is lisenting on port 1234....')
})