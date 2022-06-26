class DropProfilePictureTable < ActiveRecord::Migration[7.0]
    def up
      drop_table :profile_pictures
    end
  
    def down
      raise ActiveRecord::IrreversibleMigration
    end
end
