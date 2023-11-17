require 'spec_helper'
require 'rails_helper'
require './app/services/video_fetcher/fetch_new_videos.rb'

RSpec.describe VideoFetcher::FetchNewVideos do
  describe '#find_or_create_battler' do
    let(:vf) { VideoFetcher::FetchNewVideos.new }
    let!(:battler_1) { Fabricate(:battler, name: 'PURELYDEF') }
    let!(:battler_2) { Fabricate(:battler, name: 'DUSK') }
    let!(:battler_3) { Fabricate(:battler, name: 'P.T.') }

    context 'when the battler already exists' do
      it 'returns the existing battler' do
        expect {
          result = vf.find_or_create_battler('PURELYDEF')
          expect(result).to eq(battler_1)
        }.not_to change { Battler.count }
      end
    end

    context 'when the battler does not exist' do
      it 'creates a new battler' do
        expect {
          result = vf.find_or_create_battler('PURPLE DEF')
        }.to change { Battler.count }
      end
    end

    context 'when the battler does not exist but a similar battler does' do
        it 'returns the similar battler' do
          expect {
            result = vf.find_or_create_battler('PURELY DEF')
            expect(result).to eq(battler_1)
          }.not_to change { Battler.count }
        end
    end

    context 'when the battler name is a substring of another battler' do 
      it 'creates a new battler' do 
        expect {
          result = vf.find_or_create_battler('SK')
        }.to change { Battler.count }
      end
    end

    context '' do 
      it 'does not create a new battler' do 
        expect {
          result = vf.find_or_create_battler('PT')
          expect(result).to eq(battler_3)
        }.not_to change { Battler.count }
      end
    end
  end
end
