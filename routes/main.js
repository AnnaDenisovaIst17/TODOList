const {MainViewModel}=require('../models');
const db=require('../utils/localStorage');

module.exports=(r,q)=>{
    let model=new MainViewModel('TODO LIST', db.getTasks(), db.getStatuses());
    q.render('index',model);
}
