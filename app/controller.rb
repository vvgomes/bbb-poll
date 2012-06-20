# encoding: utf-8
require File.expand_path(File.dirname(__FILE__) + '/../config/environment')

configure do
  enable :sessions
  set :app_file, __FILE__
  set :views, File.dirname(__FILE__)+'/views'
  set :public_folder, File.dirname(__FILE__)+'/../public'
end

get '/' do
  #current = Poll.all.last
  #erb :score if current.expired?
  erb :poll, :locals => {
    :candidates => Candidate.all
  }
end

put '/' do
  #ENQUE THIS PART=========
  id = params[:selected_id]
  voted = Candidate[id]
  voted.incr :votes
  #========================
  flash[:name] = voted.name
  redirect to '/score'
end

get '/score' do
  erb :score, :locals => {
    :candidates => Candidate.all,
    :deadline => '1340229235000'
  }
end
