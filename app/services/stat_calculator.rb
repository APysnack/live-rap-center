class StatCalculator
  def initialize(numbers)
    @numbers = numbers.nil? ? [] : numbers.map(&:to_f)
  end
  
  def get_avg
    return 0 if @numbers.empty?
  
    total = @numbers.reduce(:+).to_f
    total / @numbers.length
  end

  def get_median
    return 0 if @numbers.empty?

    sorted_numbers = @numbers.sort
    len = @numbers.length
  
    if len.odd?
      sorted_numbers[len / 2]
    else
      (sorted_numbers[len / 2 - 1] + sorted_numbers[len / 2]) / 2.0
    end
  end

  def get_std_dev
    return 0 if @numbers.empty?
    sum_squared_diff = @numbers.reduce(0) { |sum, num| sum + (num - get_avg)**2 }
    Math.sqrt(sum_squared_diff / @numbers.length)
  end

  def get_zscore(data_point)
    std_dev = get_std_dev
    return 0 if @numbers.empty? || std_dev == 0
    (data_point - get_avg) / get_std_dev
  end
end
  