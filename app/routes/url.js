const express = require('express');
const pool = require('../config/db')
const router = express.Router();

const validUrl = require('valid-url')
const shortid = require('shortid')

const { isValid } = require('shortid');

const baseUrl = "https://habuild.in";

router.post('/shortner', async (req,res) => {

    const {longUrl} = req.body;

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    }


    const urlCode = shortid.generate();

    //long url
    if(validUrl.isUri(longUrl)){
        try{
            const url = await pool.query('SELECT * FROM shortner WHERE long_url = $1',[longUrl]);

            if(url.rowCount != 0){
                res.json(url.rows[0]);
            }
            else{
                const shortUrl = baseUrl +'/'+ urlCode;

                console.log(shortUrl);

                let shortUrlQuery = await pool.query('INSERT INTO shortner(long_url,short_url,urlcode) VALUES($1,$2,$3) returning *',[longUrl,shortUrl,urlCode]);
                
                if(shortUrlQuery.rowCount == 0){
                    res.json({error:"could not insert"});
                }

                res.json(shortUrlQuery.rows[0]);
            }
        }catch(err){
            console.error(err);
            res.status(501).json('Server error');
        }
    }else{
        res.status(401).json('Invalid url');
    }
});

router.post('/update', async (req,res) => {

    try{
        const {shortUrl,days} = req.body;

        const urlQuery = await pool.query('SELECT * FROM shortner WHERE short_url=$1',[shortUrl]);

        if(urlQuery.rowCount == 0){
            return  res.status(404).json("Url Not Found");
        }

        // const date = urlQuery.rows[0].expiry;

        // console.log(date);

        const tempQuery = await pool.query(`UPDATE shortner SET expiry = expiry + INTERVAL '20 days' WHERE short_url=$1 returning *`,[shortUrl]);

        if(tempQuery.rowCount !=0){
            console.log(tempQuery.rows[0]);
        }

        return res.json("Success");

    }catch(err) {
        console.error(err);
        return res.status(500).json('Server error');
    }
})

module.exports = router;