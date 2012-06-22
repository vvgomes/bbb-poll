class Poll < Ohm::Model
  attribute :deadline
  set :candidates, :Candidate

  def expired?
    Time.parse(deadline) < Time.now
  end

  def deadline_in_seconds
    Time.parse(deadline).to_i
  end

  def self.current
    Poll.all.to_a.last
  end
end

class Candidate < Ohm::Model
  attribute :name
  attribute :phone
  attribute :sms
  counter :votes
end

class VoteJob
  @queue = :votes

  def self.perform id
    Candidate[id].incr :votes
  end
end
