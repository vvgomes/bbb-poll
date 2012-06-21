require File.expand_path(File.dirname(__FILE__) + '/../config/environment')

configure do
  enable :sessions
  set :app_file, __FILE__
  set :views, File.dirname(__FILE__)+'/views'
  set :public_folder, File.dirname(__FILE__)+'/../public'
end

get '/' do
  current = Poll.current
  redirect '/score' if current.expired?
  erb :poll, :locals => { 
    :candidates => current.candidates 
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
  current = Poll.current
  erb :score, :locals => {
    :candidates => current.candidates,
    :deadline => current.deadline_in_seconds
  }
end
