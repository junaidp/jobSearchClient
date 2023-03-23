Here is the documentation of the app till now we have only one page Grid where we have the HospitalName their location and the url

First run npm install to install all the packeges we are using 
Second run npm start
Then the app will start on the IP/Port localhost:3000


Note: all the files named at the end .css are for the styling purposes and index.css file means that we are putting all the css of the parent folder of the index.css 

Only the src folder is import we go through all the files and folder in src

Note: For the deploment make the .env file to push the credentials like the the endpoint or the password

1. assets where we put the images 
2. components where we have the all component for the Grid like all the parts that make the grid
3. pages where we put the pages till now we have the Grid Page where we combine all the parts of the Grid from the components/GridComponents in the pages/Grid.jsx
4. features we we difine many stores as by need like store for Data of hospital info one is for Jobs Info etc
5. store where we put all the store as an entry point
6. App.jsx which is the second Parent of the app where we put all the pages
7. main.jsx where is the ultimate Parent of the entire app and we are putting all the stores in it
