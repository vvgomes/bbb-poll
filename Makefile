bootstrap:
	./redis-2.4.15/src/redis-server &
	VERBOSE=1 QUEUE=* bundle exec rake resque:work
	bundle exec rake db:seed
	bundle exec unicorn -c ./config/unicorn_config.rb