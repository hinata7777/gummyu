class CreateReviews < ActiveRecord::Migration[7.1]
  def change
    create_table :reviews do |t|
      t.references :product, null: false, foreign_key: true
      t.text :body
      t.integer :flavor_rating
      t.integer :texture_rating
      t.integer :hardness_level

      t.timestamps
    end
  end
end
