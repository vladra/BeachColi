class CreateBeaches < ActiveRecord::Migration
  def change
    create_table :beaches do |t|
      t.string :name
      t.float :lat
      t.float :long

      t.timestamps
    end
  end
end
