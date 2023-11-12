require 'rails_helper'

RSpec.describe StatCalculator do
  describe '#initialize' do
    it 'initializes with an empty array if numbers are nil' do
      stat_calculator = StatCalculator.new(nil)
      expect(stat_calculator.instance_variable_get(:@numbers)).to eq([])
    end

    it 'converts input strings to floats' do
      stat_calculator = StatCalculator.new(['1', '2', '3'])
      expect(stat_calculator.instance_variable_get(:@numbers)).to eq([1.0, 2.0, 3.0])
    end

    it 'converts input numbers to floats' do
        stat_calculator = StatCalculator.new([1, 2, 3])
        expect(stat_calculator.instance_variable_get(:@numbers)).to eq([1.0, 2.0, 3.0])
    end
  end

  describe '#get_avg' do
    it 'returns 0 for an empty array' do
      stat_calculator = StatCalculator.new([])
      expect(stat_calculator.get_avg).to eq(0)
    end

    it 'returns 0 for a nil input' do
      stat_calculator = StatCalculator.new(nil)
      expect(stat_calculator.get_avg).to eq(0)
    end

    
    it 'calculates the average correctly' do
      stat_calculator = StatCalculator.new([1, 2, 3, 4, 5])
      expect(stat_calculator.get_avg).to eq(3.0)
    end
  end

  describe '#get_median' do
    it 'returns 0 for an empty array' do
      stat_calculator = StatCalculator.new([])
      expect(stat_calculator.get_median).to eq(0)
    end

    it 'returns 0 for a nil input' do
      stat_calculator = StatCalculator.new(nil)
      expect(stat_calculator.get_avg).to eq(0)
    end

    it 'calculates the median for an odd-sized array' do
      stat_calculator = StatCalculator.new([1, 2, 3, 4, 5])
      expect(stat_calculator.get_median).to eq(3.0)
    end

    it 'calculates the median for an even-sized array' do
      stat_calculator = StatCalculator.new([1, 2, 3, 4, 5, 6])
      expect(stat_calculator.get_median).to eq(3.5)
    end
  end

  describe '#get_std_dev' do
    it 'returns 0 for an empty array' do
      stat_calculator = StatCalculator.new([])
      expect(stat_calculator.get_std_dev).to eq(0)
    end

    it 'returns 0 for a nil input' do
      stat_calculator = StatCalculator.new(nil)
      expect(stat_calculator.get_avg).to eq(0)
    end

    it 'calculates the standard deviation correctly' do
      stat_calculator = StatCalculator.new([1, 2, 3, 4, 5])
      expect(stat_calculator.get_std_dev).to be_within(0.0001).of(1.4142)
    end
  end

  describe '#get_zscore' do
    it 'returns 0 for an empty array' do
      stat_calculator = StatCalculator.new([])
      stat_calculator.set_data_point(4)
      expect(stat_calculator.get_zscore).to eq(0)
    end

    it 'calculates the z-score correctly' do
      stat_calculator = StatCalculator.new([1, 2, 3, 4, 5])
      stat_calculator.set_data_point(4)
      expect(stat_calculator.get_zscore).to be_within(0.0001).of(0.70711)
    end
  end
end
