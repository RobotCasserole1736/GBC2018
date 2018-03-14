echo "When prompted, type raspberry for all passwords"
scp ./* pi@raspberrypi.local:/var/www/html/  
scp ./css/* pi@raspberrypi.local:/var/www/html/css/
scp ./img/* pi@raspberrypi.local:/var/www/html/img/
scp ./js/* pi@raspberrypi.local:/var/www/html/js/