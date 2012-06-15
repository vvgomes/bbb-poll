describe Participant do
  
  before :each do
    @bambam = Participant.new(:name => 'Cleber Bambam', :avatar => 'pic.png')
  end

  it 'should have a name' do
    @bambam.name.should == 'Cleber Bambam'
  end

  it 'should have an avatar' do
    @bambam.avatar.should == 'pic.png'
  end

end