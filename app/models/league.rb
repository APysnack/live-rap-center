class League < ApplicationRecord
  belongs_to :user, optional: true
  has_many :battles
end
