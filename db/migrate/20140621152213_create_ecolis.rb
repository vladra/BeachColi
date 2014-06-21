class CreateEcolis < ActiveRecord::Migration
  def change
    create_table :ecolis do |t|
      t.date :date
      t.integer :count
      t.string :advisory
      t.string :status
      t.belongs_to :beach

      t.timestamps
    end
  end
end
