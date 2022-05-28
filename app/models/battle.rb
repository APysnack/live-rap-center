class Battle < ApplicationRecord
  belongs_to :user, optional: true
  belongs_to :league
end
