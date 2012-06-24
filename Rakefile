require File.expand_path(File.dirname(__FILE__) + '/config/environment')
require 'rake'

unless ENV['RACK_ENV'] == 'production'
  require 'rspec/core/rake_task'
  require 'jasmine'

  task :default => :spec

  spec = namespace :spec do
    RSpec::Core::RakeTask.new(:models) do |s|
      s.pattern = 'spec/models/**/*_spec.rb'
    end
    
    task :js => [:load_jasmine] do
      Rake::Task['jasmine:ci'].invoke
    end
    
    task :jasmine_server => [:load_jasmine] do
      Rake::Task['jasmine'].invoke
    end

    task :load_jasmine do    
      load 'jasmine/tasks/jasmine.rake'
    end
  end
  
  task :spec => [spec[:models], spec[:js]]
end

db = namespace :db do
  task :seed do
    ruby './db/seeds.rb'
  end
end

task :compress do
  compressor = YUI::CssCompressor.new
  styles = compressor.compress(File.open('./public/css/styles.css').read)
  File.new('./public/css/styles.min.css', 'w').write styles

  compressor = YUI::JavaScriptCompressor.new(:munge => true)
  poll = compressor.compress(File.open('./public/js/poll.js').read)
  score = compressor.compress(File.open('./public/js/score.js').read)
  File.new('./public/js/min/poll.min.js', 'w').write poll
  File.new('./public/js/min/score.min.js', 'w').write score
  puts 'Done.'
end

require './app/controller'
require 'resque/tasks'
