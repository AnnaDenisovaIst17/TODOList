const router=require('express').Router();
const main=require('./main');

//связываем маршрут и обработчик
router.get('/',main);

//экспортируем маршрутизатор
module.exports=router;