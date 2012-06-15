require File.expand_path(File.dirname(__FILE__) + '/config/environment')
require 'rake'

unless ENV['RACK_ENV'] == 'production'
  require 'rspec/core/rake_task'
  require 'jasmine'

  task :default => :spec

  n = namespace :spec do
    RSpec::Core::RakeTask.new(:models) do |spec|
      spec.pattern = 'spec/models/**/*_spec.rb'
    end
    
    RSpec::Core::RakeTask.new(:requests) do |spec|
      spec.pattern = 'spec/requests/**/*_spec.rb'
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
  
  task :spec => [n[:models], n[:javascripts], n[:requests]]
end

task :server do
  system 'rackup'
end
