ps aux|grep "node ./backend/app.js"|awk '{print $2}'|awk 'NR==1'
#ps aux|grep "npm start"|awk '{print $2}'|awk 'NR==1{print}'