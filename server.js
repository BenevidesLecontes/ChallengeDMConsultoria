var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8081;
var app = express();

app.use(bodyParser.json({ 
    type: 'application/json'
}));

app.use(express.static('./dist/'))
app.use('/templates', express.static(`${__dirname}/www/templates`));
app.use(express.static(`${__dirname}/www/images`));

router.get('*', (req, res) => {
    res.sendFile(`${__dirname}/www/index.html`);
})

app.use(router);

app.listen(port, () => {
    console.log(`O aplicativo esta escutando na porta ${port}`);
})