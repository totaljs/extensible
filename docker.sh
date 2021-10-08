echo "BUILDING"
docker-compose build

echo "TAGGING"
docker tag extensible_web totalplatform/extensible:latest

echo "PUSHING"
docker push totalplatform/extensible:latest

echo "DONE"