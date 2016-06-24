class CreateIpos < ActiveRecord::Migration
  def change
    create_table :ipos do |t|
      t.integer :year
      t.integer :biotech_ipos
      t.integer :biotech_percent
      t.integer :other_ipos
      t.integer :other_percent

      t.timestamps null: false
    end
  end
end
