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
  Resque.enqueue(VoteJob, params[:selected_id])
  flash[:name] = params[:selected_name]
  redirect to '/score'
end

get '/score' do
  current = Poll.current
  erb :score, :locals => {
    :candidates => current.candidates,
    :deadline => current.deadline_in_seconds
  }
end
