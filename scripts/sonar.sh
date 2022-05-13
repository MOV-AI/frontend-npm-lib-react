docker run \
    --rm \
    -e SONAR_HOST_URL="https://sonarqube.aws.cloud.mov.ai" \
    -e SONAR_LOGIN=${SONAR_TOKEN} \
    -v "${PWD}:/usr/src" \
    sonarsource/sonar-scanner-cli -Dsonar.projectKey=${PWD##*/}
