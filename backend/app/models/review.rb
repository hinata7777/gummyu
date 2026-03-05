class Review < ApplicationRecord
  belongs_to :product

  validates :body, presence: true
  validates :flavor_rating, presence: true, inclusion: { in: 1..5 }
  validates :texture_rating, presence: true, inclusion: { in: 1..5 }
  validates :hardness_level, presence: true, inclusion: { in: 1..5 }
end
