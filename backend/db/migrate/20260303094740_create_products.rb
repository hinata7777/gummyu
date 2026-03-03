class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :source
      t.string :external_id
      t.string :name
      t.string :image_url
      t.text :product_url

      t.timestamps
    end
  end
end
