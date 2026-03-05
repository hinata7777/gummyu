class Product < ApplicationRecord
  has_many :reviews, dependent: :destroy

  validates :source, presence: true
  validates :external_id, presence: true
  validates :name, presence: true

  validates :external_id, uniqueness: { scope: :source }
end