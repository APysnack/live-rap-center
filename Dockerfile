ARG APP_TYPE=server

# Common stage
FROM ruby:3.1.0-alpine as common
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

WORKDIR /app
COPY . .

ENV BUNDLE_PATH /gems

RUN yarn install 
RUN bundle install

# Server stage
FROM common as server
ENTRYPOINT ["bin/rails"]
CMD ["s", "-b", "0.0.0.0"]
EXPOSE 3000

# Sidekiq stage
FROM common as sidekiq
ENTRYPOINT ["bundle", "exec", "sidekiq", "-e", "production"]
