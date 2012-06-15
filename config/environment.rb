require 'rubygems'
require 'bundler'

Bundler.require :default
Dir.glob(File.expand_path(File.dirname(__FILE__)+'/../app/models/**/*.rb')).each{|f| require f}