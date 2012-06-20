class Poll < Ohm::Model
  attribute :deadline
  collection :candidates, :Candidate
end

class Candidate < Ohm::Model
  attribute :name
  attribute :phone
  attribute :sms
  counter :votes
end

#Candidate.create(:name => 'Marcia', :phone => '0800-123-001', :sms => '8001')
#Candidate.create(:name => 'Renato', :phone => '0800-123-002', :sms => '8002')