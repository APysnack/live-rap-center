class BattlerBattleResult < ApplicationRecord
  belongs_to :battler
  belongs_to :battle
  enum outcome: [ :win, :loss, :tie ]
end
