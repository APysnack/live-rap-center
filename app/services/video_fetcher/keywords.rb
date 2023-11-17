module VideoFetcher
  class Keywords
    KEY_WORDS = [
      'HOSTED',
      'COHOST',
      'CO-HOST',
      'CO-',
      'BATTLES',
      'RAP BATTLES',
      'RAP BATTLE',
      'BATTLE',
      'PRESENTED',
      'PRESENTS',
      'QOTR',
      'QUEEN OF THE RING',
      'PIT FIGHT',
      'AHAT',
      'RAPPER',
      'BATTLER',
      '360°',
      'IBATTLETV',
      'IBATTLE',
    ].freeze
    
    STRINGS_TO_REMOVE = [
      'kings vs queens',
      'USA vs',
      'vs USA',
      'CHAMPION vs',
      'vs Champion',
      'blind vs',
      'deaf vs',
      'vs blind',
      'vs deaf',
    ].freeze 
  end
end



