let db=require('../utils/sqlitedb');

exports.info=(r,q)=>{
    q.render('api');
};
let buf_role;
exports.auth=(r,q,next)=>{
    console.log(r.query);
    db.getRole(r.query).then(role=>{
        r.isAdmin=role==='Admin';
        r.isUser=role==='Admin'|| role==='User';
        buf_role=role;
        if (r.isUser){
            next();
        }
        else{
            q.status(401).json('Login or password is incorrect');
            let log={
                whoDo:"Unknown",
                whatDo:`API Auth`,
                whenDo:new Date().toISOString()
            }
            console.log(log)
            db.addLogger(log);
        }
    });
    
};

exports.get = (r, q) => {
    db.getTasks(+r.query.id).then(item => {
        q.json(item || {});

        let log={
            whoDo:buf_role,
            whatDo:`API  Get task to id=${r.query.id}`,
            whenDo:new Date().toISOString()
        }
        console.log(log);
        db.addLogger(log);
    });
};

exports.add=(r,q)=>{
    if (r.isAdmin){
        db.getStatuses(+r.body.status).then(status=>{
            r.body.status=status;
            let b=status;
            db.addTask(r.body).then(x=>{
                db.getLastTask().then(task=>{
                    q.json(task);
                    let log={
                        whoDo:buf_role,
                        whatDo:`API Add task=${task.id},${task.title},${task.startDate},${task.endDate},${b.name}`,
                        whenDo:new Date().toISOString()
                    }
                    console.log(log);
                    db.addLogger(log);
                });
            });
        })
    }
    else{
        q.status(403).json('You can not add task. You are not ADMIN');
        let log={
            whoDo:buf_role,
            whatDo:`API Try to add`,
            whenDo:new Date().toISOString()
        }
        console.log(log);
        db.addLogger(log);
    }  
};

exports.delete=(r,q)=>{
    if (r.isAdmin){
        db.getTasks(+r.query.id).then(task=>{
            db.removeTask(task.id).then(x=>{
                q.json(task);
                let log={
                    whoDo:buf_role,
                    whatDo:`API Delete task=${task.id},${task.title},${task.startDate},${task.endDate},${task.status.name}`,
                    whenDo:new Date().toISOString()
                }
                console.log(log);
                db.addLogger(log);

            });
        })
      
    }
    else{
        q.status(403).json('You can not delete task. You are not ADMIN');
        let log={
            whoDo:buf_role,
            whatDo:`API Try to delete`,
            whenDo:new Date().toISOString()
        }
        console.log(log);
        db.addLogger(log);
    }  
}

exports.update=(r,q)=>{
    if (r.isAdmin){
        db.getStatuses(+r.body.status).then(status=>{
            r.body.status=status;
            db.updateTask(r.body).then(x=>{
                db.getTasks(r.body.id).then(task=>{
                    q.json(task);
                    let log={
                        whoDo:buf_role,
                        whatDo:`API Update task=${task.id},${task.title},${task.startDate},${task.endDate},${task.status.name}`,
                        whenDo:new Date().toISOString()
                    }
                    console.log(log);
                    db.addLogger(log);
                });
            });
        })
    }
    else{
        q.status(403).json('You can not update task. You are not ADMIN'); 
        let log={
        whoDo:buf_role,
        whatDo:`API Try to update`,
        whenDo:new Date().toISOString()
        }   
        console.log(log);
        db.addLogger(log);
    } 
   
}

