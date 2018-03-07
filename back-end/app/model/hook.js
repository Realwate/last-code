
module.exports = app => {
  let Sequelize = app.Sequelize;
  let excludeAttr = ['version']
     app.model.addHook('beforeFind',(options)=>{ // 忽略字段
       let older =  [];
       options.attributes = options.attributes || {};
       if(options.attributes && options.attributes.exclude){
        older = options.attributes.exclude;
       }
      options.attributes.exclude = older.concat(excludeAttr);
    })
}
