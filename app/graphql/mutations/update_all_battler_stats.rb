module Mutations
  class UpdateAllBattlerStats < BaseMutation
    field :message, String, null: false

    def resolve
      updater = StatUpdater.new
      updater.update_battle_views
      { message: "Update all battlers called successfully!" }
    end
  end
end
