module.exports= {
    getHomePage: (req, res)=>{
        let query = "SELECT * FROM players ORDER BY id ASC"; 

        db.query(query, (err, result) => {
            if(err){
                res.redirect('/');
            }
            res.render('index.ejs',{
                title: 'Bienvenido a socka | vista de jugadores',
                players: result
            });
        });
    }
}