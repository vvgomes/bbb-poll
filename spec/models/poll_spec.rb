describe Poll do

  before :each do
    @deadline = Time.local(2012, 'jun', 24, 20, 0, 0)
    @poll = Poll.new(:deadline => @deadline.to_s, :id => 1)
  end

  it 'should be expired when the deadline is past' do
    Time.stub!(:now).and_return(@deadline + 10)
    @poll.should be_expired
  end

  it 'should not be expired when deadline is future' do
    Time.stub!(:now).and_return(@deadline - 10)
    @poll.should_not be_expired
  end

  it 'should give me the deadline in seconds' do
    @poll.deadline_in_seconds.should == 1340578800
  end

  it 'should be the current poll when it is the last created' do
    Poll.stub!(:all).and_return [@poll]
    Poll.current.should == @poll
  end

end