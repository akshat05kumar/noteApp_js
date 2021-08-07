const fs = require('fs');
const yargs =require('yargs');
const chalk = require('chalk');
const { argv } = require('yargs');

const title=yargs.argv.title;
const body= yargs.argv.body;
 


 let  command = yargs.argv._[0];

switch(command){
 case 'add': add(title,body);
             break;
 case 'remove': remove(title);
                  break;
 case 'list' : list();
               break;
 case 'read'  : read(title);
               break;             
default: console.log("Enter Valid Option!" );
         break;
  
}


 function add(title,body){
   let notes =[];
   try{
      notes =JSON.parse(fs.readFileSync("notes.json"));
   }
   catch(e){
     console.log(chalk.bgRed(e));
   }

   let index = notes.findIndex((x)=>x.title==title);
   if(index==-1){
     notes.push({title,body});

     fs.writeFileSync("notes.json",JSON.stringify(notes));
   console.log(chalk.bgGreen("NEW NOTE CREATED!"));
   }
   else{
     console.log(chalk.bgRed("TITLE ALREADY TAKEN!"));
   }

}
    
  function remove(title){
      let notes=[];
    try {
         notes=JSON.parse(fs.readFileSync("notes.json"));}
       catch(e){
         console.log(chalk.bgRed(e));
       }
       let index = notes.findIndex((x)=>x.title==title);
       
       if(index!=-1){
        notes.splice(index, index+1); 
       fs.writeFileSync("notes.json",JSON.stringify(notes));
       console.log(chalk.bgGreen("NOTE REMOVED!"));
       }
       else{
         console.log(chalk.bgRed("NOTE NOT FOUND!"));
       }
  }    
 
 
  function list(){
     let notes=[];
    try{
    notes=JSON.parse(fs.readFileSync("notes.json"));
    }
    catch(e){
      console.log(chalk.bgred(e));
    }
    
    console.log(chalk.bgBlue("YOUR NOTES!"));
    for (var i = 0; i < notes.length; i++) {
      console.log(notes[i].title);
  }   
  }

function read(title){
  let notes =[];
  try{
     notes =JSON.parse(fs.readFileSync("notes.json"));
  }
  catch(e){
    console.log(chalk.bgRed(e));
  }

  let index = notes.findIndex((x)=>x.title==title);
  if(index!=-1){
       console.log(chalk.bgYellow(title));
        console.log(notes[index].body);
      }
  
  else
  {
    console.log("error!");
  }
}