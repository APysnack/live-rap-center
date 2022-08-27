class Event < ApplicationRecord
  belongs_to :league
  has_many :battles
end
