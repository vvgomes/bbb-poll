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
