ruby on rails<br/>
devise user authentication<br/>
graphql/graphiql/apollo graphql<br/>
tailwind css<br/>
styled components<br/>
material ui<br/>
formik<br/>
redux<br/>
redux-persist<br/>
and more<br/>

(extra dependencies made need to be installed):

1. Clone the git repository

$ `git clone git@github.com:APysnack/live-rap-center.git`

---------------------------
2. Change directory into the live rap center folder

$ `cd live-rap-center`

---------------------------
3. Generate a secret hash

$`rake secret`

copy the output

---------------------------
4.Generate rails credentials and add your secret in a text editor (I use vim in this example, use whatever editor you're comfortable with)

$`EDITOR=vim rails credentials:edit`

paste the secret as shown below. Do not modify the `secret_key_base`. Note there are exactly 2 spaces of indentation before `jwt_secret_key`:

![Screen Shot 2022-05-26 at 8 00 58 AM](https://user-images.githubusercontent.com/60242065/170687927-87f2d102-315d-4dfa-afe2-f1cad53e7261.png)

---------------------------
5. Be sure to create a `.env` file in the project's `root` directory to save the master key that is shown after you save and completed the last step

In the .env file Add `RAILS_MASTER_KEY=PASTEMASTERKEYHERE`

---------------------------
6. Install rails gems

$`bundle install`

---------------------------
7. Run the rails migrations

$`bundle exec rake db:migrate`

---------------------------
8. You should now be able to run $`rails s` and see a blank page at `localhost:3001` with the word "main" on it. Keep the server terminal open. 

---------------------------
9. Open a new terminal, cd to the `live-rap-center/client` folder

---------------------------
10. Install yarn dependencies

$`yarn install`

---------------------------
11. Start the client

$`yarn start`

This should start up the client on `localhost:3000`
