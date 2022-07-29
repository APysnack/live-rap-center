class Score < ApplicationRecord
  belongs_to :battler
  belongs_to :battle_vote
  enum outcome: [ :win, :loss, :tie ]
end
