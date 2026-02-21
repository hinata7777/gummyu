FROM ruby:3.3

RUN apt-get update -y && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV BUNDLE_PATH=/bundle

RUN gem install bundler

CMD ["bash", "-lc", "bundle install && rm -f tmp/pids/server.pid && bundle exec rails s -b 0.0.0.0 -p 3000"]