while ! nc -z db 27017; do
  sleep 0.1
done

npm start
