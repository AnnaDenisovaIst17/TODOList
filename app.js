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

//запуск приложения с прослушивания порта
app.listen(port,()=> {console.info(`app run on http://localhost:${port}`);});