class CreateIncidents < ActiveRecord::Migration
  def change
    create_table :incidents do |t|
      t.string :category
      t.text :description
      t.string :day_val
      t.datetime :date_time
      t.string :location

      t.timestamps null: false
    end
  end
end
