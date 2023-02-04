FROM ruby:3.0.4-alpine

# installs dependencies
# note for Mac M1 gcompat seems necessary, otherwise nokogiri throws an error
RUN apk add --update --virtual \
  runtime-deps \
  postgresql-client \
  build-base \
  libxml2-dev \
  libxslt-dev \
  nodejs \
  yarn \
  libffi-dev \
  readline \
  build-base \
  postgresql-dev \
  libc-dev \
  linux-headers \
  readline-dev \
  file \
  imagemagick \
  git \
  gcompat \
  tzdata \
  && rm -rf /var/cache/apk/*

# tells docker to install and work out of the /app folder
WORKDIR /app

# copies all the files in current directory into /app
COPY . .

# installs all gems to /gems folder
ENV BUNDLE_PATH /gems

RUN yarn install 
RUN bundle install

ENTRYPOINT ["bin/rails"]
CMD ["s", "-b", "0.0.0.0"]

# port to be exposed
EXPOSE 3000