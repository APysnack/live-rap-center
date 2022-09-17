class Event < ApplicationRecord
  belongs_to :league
  has_many :battles
  has_one_attached :flyer_image
  has_one :location
end
