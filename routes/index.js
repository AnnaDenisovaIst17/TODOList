const router=require('express').Router();
const main=require('./main');
const crud=require('./crud');

//связываем маршрут и обработчик
router.get('/',main);
router.get('/get/:id',crud.get);
router.post('/add',crud.add);
router.post('/update',crud.update);
router.get('/delete/:id', crud.delete);

//экспортируем маршрутизатор
module.exports=router;