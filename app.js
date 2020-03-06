const express=require('express');
const bodyParser=require('body-parser');
const routes=require('./routes');


//создание приложения
let app=express();
//установка порта для приложения
let port=80;
//задаем шаблонизатор для представления
app.set('view engine','pug');
//задаем директорию со статическими файлами
app.use(express.static(__dirname+'/public'));
//заадаем парсер тела запроса (Request body)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Добавляем маршрутизатор
app.use('/', routes);
app.use(function(req, res, next) {
    let log={
        whoDo:"Unknown",
        whatDo:`Write unknown route-404`,
        whenDo:new Date().toISOString()
    }
    console.log(log)
    //db.addLogger(log);
    res.redirect('/');
    //res.status(404).send('Sorry cant find that!');
  });
  

//запуск приложения с прослушивания порта
app.listen(port,()=> {console.info(`app run on http://localhost:${port}`);});