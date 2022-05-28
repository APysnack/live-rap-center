class League < ApplicationRecord
  belongs_to :user, optional: true
end
