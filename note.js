fetch('https://dog.ceo/api/breeds/list/all').then((res)=>{
    return res.json() //res.json actually returns another promise with data
}).then((data)=>{
    console.log(data)
})