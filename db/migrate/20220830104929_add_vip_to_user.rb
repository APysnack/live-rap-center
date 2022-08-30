class AddVipToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :vip_status, :boolean, default: false
  end
end
