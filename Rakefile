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
    
    task :javascripts => [:load_jasmine] do
      Rake::Task['jasmine:ci'].invoke
    end
    
    task :jasmine_server => [:load_jasmine] do
      Rake::Task['jasmine'].invoke
    end

    task :load_jasmine do    
      load 'jasmine/tasks/jasmine.rake'
    end
  end
  
  task :spec => [spec[:models], spec[:javascripts]]
end

db = namespace :db do
  task :seed do
    ruby './db/seeds.rb'
  end
end

require './app/controller'
require 'resque/tasks'
