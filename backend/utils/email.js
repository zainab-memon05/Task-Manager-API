const mail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path : path.join(__dirname , '../.env')});

mail.setApiKey(process.env.SEND_GRID_API_KEY);

module.exports.completionEmail = async (task) => {

const msg = {
  to : task.user.email,
  from : {
    name : 'Task Manager',
    email : 'zainabmemon1505@gmail.com'
  },
    subject : 'Task Completed',
    text : 'You completed your task good efforts staying patient and consistent to complete your task',
    html : `<h3>Hi ${task.user.name},</h3> <br> <br> <p>You have successfully completed the ${task.title} task</p> <br> <p>Don't forget to celebrate your consistency and hardwork!</p>` 
}

try {
  await mail.send(msg);

}
catch(e){
  console.log(`there was some problem sending you an email ${e.message}`);
}

}
