var koa = require('koa');
var static = require('koa-static');
var gzip = require('koa-gzip');
var Router = require('koa-router');
var bodyParser = require('koa-body-parser');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var views = require('koa-views');
var nunjucks = require('nunjucks');

var router = new Router();

var app = koa();
app.use(gzip());
app.use(static('public'));
app.use(bodyParser());


app.use(views('views', {
    map: {
        html: 'nunjucks'
    }
}));



var paths = {
   '/': 'index',
   '/cocina': 'cocina',
   '/entrada': 'entrada',
   '/intercomunicacion': 'intercomunicacion',
   '/vitrales': 'vitrales',
   '/artisticos': 'artisticos',
   '/contacto': 'contacto',
   '/enviado': 'enviado',
   '/products': 'products',
   '/galeria': 'galeria',
   '/galeria-interior': 'galeria-interior',
   '/galeria-cocina': 'galeria-cocina',
   '/galeria-vitrales': 'galeria-vitrales',
   '/galeria-artisticos': 'galeria-artisticos',
   '/galeria-ventanas': 'galeria-ventanas',
   '/ventanas': 'ventanas'
};

Object.keys(paths).forEach(function(path) {
    router.get(path, function*() {
        yield this.render(paths[path]);
    });
});

app.use(router.routes());





app.use(function *(){
    this.response.status = 404;
    this.body = 'Lo sentimos, no se encontró el archivo. Por favor vuelve a puertas.xyz y empieza de nuevo.';
});


var port = process.env.PORT || 4000;

app.listen(port, function() {
    console.log('Listening on port ' + port + ', go to http://localhost:' + port + '/ ');
});
