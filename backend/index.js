require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
const authUsername='DJ@4';
const authPassword='Dhunjam@2023';

const users= { id: 3, username: authUsername, password: authPassword,name:"Social",location:"Hebbal",charge_customers:true,amount:{category_6:100,category_7:80,
    category_8:60,
    category_9:40,
    category_10:20,
} };


app.post('/account/admin/login', (req, res) => {    



  const { username, password } = req.body;
  try {

    if (users.username===username && users.password===password) {
        const userData = {
            id: users.id,
            username: users.username,
            password: users.password,
          };
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' });


      res.status(200).json({
        status: 200,
        response: 'Success',
        data: {
          id: users.id,
          token: token,
        },
        server_err_msg: null,
        ui_err_msg: null,
      });
    } else {
      res.status(401).json({
        status: 401,
        response: 'Unauthorized',
        data: null,
        server_err_msg: null,
        ui_err_msg: 'Invalid credentials',
      });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({
      status: 500,
      response: 'Internal Server Error',
      data: null,
      server_err_msg: 'Internal server error occurred',
      ui_err_msg: null,
    });
  }
});


app.get('/account/admin/login/:userid',(req,res)=>{
    const userId = parseInt(req.params.userid, 10);
    try {

        if (userId==users.id) {
    
    
          res.status(200).json({
            status: 200,
            response: 'Success',
            data: {
              id: userId,
              name:users.name,
              location:users.location,
              charge_customers:users.charge_customers,
              amount:users.amount
              
            },
            server_err_msg: null,
            ui_err_msg: null,
          });
        } else {
          res.status(401).json({
            status: 401,
            response: 'Unauthorized',
            data: null,
            server_err_msg: null,
            ui_err_msg: 'Invalid credentials',
          });
        }
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({
          status: 500,
          response: 'Internal Server Error',
          data: null,
          server_err_msg: 'Internal server error occurred',
          ui_err_msg: null,
        });
      }

});



app.put('/account/admin/update/:userId', (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    console.log(userId);
  
    try {
      if (users.id === userId) {
        const { amount} = req.body;
        category_6=amount.category_6;
        

  
        if (category_6 !== undefined && !isNaN(category_6) && category_6 >= 0) {
          users.amount.category_6 = category_6;
          console.log(users);
          
          res.status(200).json({
            status: 200,
            response: 'Success',
            data: {
              amount: {
                "category_6":category_6
              },
            },
            server_err_msg: null,
            ui_err_msg: null,
          });
          
        } else {
          res.status(400).json({
            status: 400,
            response: 'Bad Request',
            data: null,
            server_err_msg: null,
            ui_err_msg: 'Invalid category_6 amount',
          });
        }
      } else {
        res.status(401).json({
          status: 401,
          response: 'Unauthorized',
          data: null,
          server_err_msg: null,
          ui_err_msg: 'Invalid credentials',
        });
      }
    } catch (error) {
      console.error('Error during updateCategory6:', error);
      res.status(500).json({
        status: 500,
        response: 'Internal Server Error',
        data: null,
        server_err_msg: 'Internal server error occurred',
        ui_err_msg: null,
      });
    }
  });
  
  
















app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
