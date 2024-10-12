git pull

docker stop lp-netflix-google
docker rm lp-netflix-google
docker rmi lp-netflix-google/ok123

docker build -t lp-netflix-google/ok123 .
docker run --name lp-netflix-google -itd -p 3001:3000 lp-netflix-google/ok123