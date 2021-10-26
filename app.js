const express=require('experess');
const app =express();
const port =3000;
app.use(express.urlencoded({extended: true}));

let checkAuth =((req,res, next) => {
    let token= req.headers['access-token'];

});

if(token){
    //TODO Comprobamos la información
    jwt.verify(token, 'miclave', (err, data) => {
        if (err){console.log(err.message);
            return res.json({message: 'token invalido'});
        }
        else{ 
            req.user_permissions=data.permissions;
            next();}
    } )

}else{
    res.json({message: 'unauthorized'});
}
app.post ('/auth', (req,res)=> {
if (req.body.user == 'usuario' &&
  req.body.password =='password'){
     let payload ={
          permissions : ['read' , 'write']
  
        }
    const token =jwt. sign (payload, 'miclave', {
        expireIn : 3600
    });
    res.json({token:token})

  
  }
});

app.get ('/' , checkAuth, (req,res) => {
   if( req.user_permissions.includes('read'))
  {  res.send('<h1>Fola>/h1>')}
  
  else{
      res.json( message: 'no tiene permison')
  }});

  app.get ('/save' , checkAuth, (req,res) => {
    if( req.user_permissions.includes('write') )
   {  res.send('<h1>Guardamos la informacion>/h1>')}
   
   else{
       res.json( message: 'no tiene permisos para gurardar')
   }});
 


  app.listen (port, () => {
  console.log(`server listening in ${port}`);
});