# encoding: utf-8
require File.expand_path(File.dirname(__FILE__) + '/../config/environment')

configure do
  enable :sessions
  set :app_file, __FILE__
  set :views, File.dirname(__FILE__)+'/views'
  set :public_folder, File.dirname(__FILE__)+'/../public'
end

get '/' do
  redirect to '/poll'
end

get '/poll' do
  erb :poll
end

put '/poll' do
  voted = params[:selected]
  name = 'Silvia' if voted == '1'
  name = 'Marcos' if voted == '2'

  puts ">>>>> GOT HERE!!! AND THE NAME IS #{name}"

  flash[:name] = name
  redirect to '/score'
end

get '/score' do
  erb :score
end
