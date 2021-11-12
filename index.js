const express = require('express')
const app = express()
const { seasons, characters } = require('./data')

//sets up the homepage
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1><a href="/api/v1/query">seasons</a><h2>List of episodes in the 4 seasons, use api/v1/query?search=S1 to search by season or E1 to search by episode, make sure letter is capital, add &limit=1 to add a limit</h2><p>-</p><a href="/api/v2/query">characters</a><h2>list of all characters in class 1A, use api/v2/query?gender=Male to search by gender or query?name=Yuga to search by name, make sure firslt letter is capital, add &limit=1 to add a limit</h2>')
})

//list of characters 
app.get('/api/seasons', (req, res) => {
    const newSeasons = seasons.map((product) => {
        const { id, title, place, image, desc } = product
        return { id, title, place, image, desc }
    })

    res.json(newSeasons)
})
//find episode by id
/* app.get('/api/seasons/:seasonsID', (req, res) => {
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
}) */

//list of characters
app.get('/api/characters', (req, res) => {
    const newCharacter = characters.map((product2) => {
        const { id, name, heroName, gender, quirk, desc, image } = product2
        return { id, name, heroName, gender, quirk, desc, image }
    })

    res.json(newCharacter)
})

//find charcter by id
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

//version 1, includes all 4 seasons of "my hero" and has a search and limit function built into it
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

app.get('/api/v2/query', (req,res) => {
    //console.log(req.query)
    //(query?search=fight)
    //(query?search=fight&limit=3)
    const { gender, limit, name } = req.query
    let sortedCharacters = [...characters]

    if(gender){
        sortedCharacters = sortedCharacters.filter((seasons) => {
            return seasons.gender.includes(gender)
        })
    }
    if(name){
        sortedCharacters = sortedCharacters.filter((seasons) => {
            return seasons.name.includes(gender)
        })
    }
    if(limit){
        sortedCharacters = sortedCharacters.slice(0 , Number(limit))
    }
    if(sortedCharacters.length < 1){
        //res.status(200).send('no products matched your search');
        return res.status(200).json({sucess: true, data: [] })
    }
    res.status(200).json(sortedCharacters)
})

//localhost 1234
app.listen(1234, () => {
    console.log('Server is lisenting on port 1234....')
})