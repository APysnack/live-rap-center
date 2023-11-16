**implements:**<br/>
ruby on rails<br/>
devise user authentication<br/>
graphql/graphiql/apollo graphql<br/>
styled components<br/>
material ui<br/>
formik<br/>
redux<br/>
redux-persist<br/>
and more<br/>

(extra dependencies made need to be installed):

1. Clone the git repository

$ `git clone git@github.com:APysnack/live-rap-center.git`

---

2. Change directory into the live rap center folder

$ `cd live-rap-center`

---

3. Generate a secret hash

$`rake secret`

copy the output (if the output you get is longer than 32 characters, only copy the first 32 characters.)

---

4.Generate rails credentials and add your secret in a text editor (I use vim in this example, use whatever editor you're comfortable with)

$`EDITOR=vim rails credentials:edit`

paste the secret as shown below. Do not modify the `secret_key_base`. Note there are exactly 2 spaces of indentation before `jwt_secret_key`:

![Screen Shot 2022-05-26 at 8 00 58 AM](https://user-images.githubusercontent.com/60242065/170687927-87f2d102-315d-4dfa-afe2-f1cad53e7261.png)

---

5. Be sure to store this secret somewhere secure in case you need access to it in the future

---

6. Install rails gems

$`bundle install`

---

7. Run the rails migrations

$`bundle exec rake db:migrate`

---

8. You should now be able to run $`rails s` and see a blank page at `localhost:3000` with the word "main" on it. Keep the server terminal open.

---

9. Open a new terminal, cd to the `live-rap-center/client` folder

---

10. Install yarn dependencies

$`yarn install`

---

11. Start the client

$`yarn start`

This should start up the client on `localhost:4000`


------------------------------------------------------------------------------------------
Deploy Steps

1. Get AWS credentials and set ecr login
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 655948565243.dkr.ecr.us-east-1.amazonaws.com
```

3. Build and push server container image
```
docker build --build-arg APP_TYPE=server --platform linux/amd64 --tag 655948565243.dkr.ecr.us-east-1.amazonaws.com/lrc_server .
docker push 655948565243.dkr.ecr.us-east-1.amazonaws.com/lrc_server:latest
```

3. Build and push sidekiq container image
```
docker build --build-arg APP_TYPE=sidekiq --platform linux/amd64 --tag 655948565243.dkr.ecr.us-east-1.amazonaws.com/sidekiq_jobs .
docker push 655948565243.dkr.ecr.us-east-1.amazonaws.com/sidekiq_jobs:latest
```

4. Use Cloudformation template to create CFN Stack

5. set config.active_storage.service = :amazon in development.rb and update database.yml
```
development:
  <<: *default
  host: <%= ENV.fetch('AWS_RDS_HOST') %>
  username: <%= ENV.fetch('AWS_RDS_USERNAME') %>
  password: <%= ENV.fetch('AWS_RDS_PASSWORD') %>
  database: <%= ENV.fetch('AWS_RDS_NAME') %>
  port: <%= ENV.fetch('AWS_RDS_PORT') %>
```

7. initialize the RDS DB
```
SEED_FILE=production rake db:reset
```

8. Ensure that your client .env file has the new cloudfront distribution id and correct server url
```
cd client
yarn update
```
