const router=require('express').Router();
const main=require('./main');
const crud=require('./crud');

//связываем маршрут и обработчик
router.get('/',main);
router.post('/add', crud.add);

//экспортируем маршрутизатор
module.exports=router;