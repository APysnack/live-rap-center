FROM node:18-alpine

# tells docker to install and work out of the /app folder
WORKDIR /app

# Docker uses caching to improve performance. Having the yarn install command before 
# the command to copy all the files will prevent it from reinstalling every time there's
# a trivial (unrelated to dependencies) change to the codebase
COPY package.json .

RUN yarn install

# copies all the files in current directory into /app
COPY . .

EXPOSE 4000

CMD ["yarn", "start"]
