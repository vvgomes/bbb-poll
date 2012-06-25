require File.expand_path(File.dirname(__FILE__) + '/../config/environment')

Poll.all.each do |p|
  p.candidates.each{ |c| c.delete }
  p.delete
end

current = Poll.create(:deadline => Time.local(2012, 'jun', 30, 20, 0, 0))
current.candidates.add Candidate.create(:name => 'Marcia', :phone => '0800-123-001', :sms => '8001')
current.candidates.add Candidate.create(:name => 'Renato', :phone => '0800-123-002', :sms => '8002')