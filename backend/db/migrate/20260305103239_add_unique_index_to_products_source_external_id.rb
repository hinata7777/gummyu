class AddUniqueIndexToProductsSourceExternalId < ActiveRecord::Migration[7.1]
  def change
    add_index :products, [:source, :external_id], unique: true
  end
end
