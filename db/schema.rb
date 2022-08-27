# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_08_27_111856) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "awards", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "award_type"
  end

  create_table "battle_votes", force: :cascade do |t|
    t.bigint "voter_id", null: false
    t.bigint "battle_id", null: false
    t.text "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "selected_winner_id"
    t.index ["battle_id"], name: "index_battle_votes_on_battle_id"
    t.index ["voter_id"], name: "index_battle_votes_on_voter_id"
  end

  create_table "battler_awards", force: :cascade do |t|
    t.bigint "battler_id", null: false
    t.bigint "award_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["award_id"], name: "index_battler_awards_on_award_id"
    t.index ["battler_id"], name: "index_battler_awards_on_battler_id"
  end

  create_table "battler_battle_results", force: :cascade do |t|
    t.bigint "battler_id", null: false
    t.bigint "battle_id", null: false
    t.integer "outcome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_battler_battle_results_on_battle_id"
    t.index ["battler_id"], name: "index_battler_battle_results_on_battler_id"
  end

  create_table "battler_battles", force: :cascade do |t|
    t.bigint "battler_id", null: false
    t.bigint "battle_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_battler_battles_on_battle_id"
    t.index ["battler_id"], name: "index_battler_battles_on_battler_id"
  end

  create_table "battler_followers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "battler_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battler_id"], name: "index_battler_followers_on_battler_id"
    t.index ["user_id"], name: "index_battler_followers_on_user_id"
  end

  create_table "battler_follows", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "battler_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battler_id"], name: "index_battler_follows_on_battler_id"
    t.index ["user_id"], name: "index_battler_follows_on_user_id"
  end

  create_table "battlers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "league_id"
    t.bigint "user_id"
    t.integer "booking_price", default: 0
    t.boolean "booking_price_enabled", default: false
    t.decimal "score", precision: 5, scale: 1, default: "0.0"
    t.index ["league_id"], name: "index_battlers_on_league_id"
    t.index ["user_id"], name: "index_battlers_on_user_id"
  end

  create_table "battles", force: :cascade do |t|
    t.bigint "views"
    t.integer "rating"
    t.string "battle_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "league_id", null: false
    t.decimal "score", precision: 4, scale: 1, default: "0.0"
    t.datetime "closed_at"
    t.integer "battle_status", default: 1
    t.integer "event_id"
    t.index ["event_id"], name: "index_battles_on_event_id"
    t.index ["league_id"], name: "index_battles_on_league_id"
  end

  create_table "channel_messages", force: :cascade do |t|
    t.bigint "channel_id", null: false
    t.bigint "user_id", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_messages_on_channel_id"
    t.index ["user_id"], name: "index_channel_messages_on_user_id"
  end

  create_table "channel_users", force: :cascade do |t|
    t.bigint "channel_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_channel_users_on_channel_id"
    t.index ["user_id"], name: "index_channel_users_on_user_id"
  end

  create_table "channels", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "crew_chat_messages", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id", null: false
    t.bigint "crew_chat_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["crew_chat_id"], name: "index_crew_chat_messages_on_crew_chat_id"
    t.index ["user_id"], name: "index_crew_chat_messages_on_user_id"
  end

  create_table "crew_chat_users", force: :cascade do |t|
    t.bigint "crew_chat_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["crew_chat_id"], name: "index_crew_chat_users_on_crew_chat_id"
    t.index ["user_id"], name: "index_crew_chat_users_on_user_id"
  end

  create_table "crew_chats", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "crew_id", null: false
    t.index ["crew_id"], name: "index_crew_chats_on_crew_id"
  end

  create_table "crews", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_crews_on_user_id"
  end

  create_table "event_battles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer "admission_cost"
    t.datetime "date"
    t.string "address"
    t.string "name"
    t.bigint "league_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_id"], name: "index_events_on_league_id"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.text "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "league_admins", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "league_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_id"], name: "index_league_admins_on_league_id"
    t.index ["user_id"], name: "index_league_admins_on_user_id"
  end

  create_table "league_awards", force: :cascade do |t|
    t.bigint "league_id", null: false
    t.bigint "award_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["award_id"], name: "index_league_awards_on_award_id"
    t.index ["league_id"], name: "index_league_awards_on_league_id"
  end

  create_table "league_chat_messages", force: :cascade do |t|
    t.bigint "league_chat_id", null: false
    t.bigint "user_id", null: false
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_chat_id"], name: "index_league_chat_messages_on_league_chat_id"
    t.index ["user_id"], name: "index_league_chat_messages_on_user_id"
  end

  create_table "league_chat_users", force: :cascade do |t|
    t.bigint "league_chat_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_chat_id"], name: "index_league_chat_users_on_league_chat_id"
    t.index ["user_id"], name: "index_league_chat_users_on_user_id"
  end

  create_table "league_chats", force: :cascade do |t|
    t.bigint "league_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["league_id"], name: "index_league_chats_on_league_id"
  end

  create_table "league_invitations", force: :cascade do |t|
    t.bigint "league_id", null: false
    t.bigint "battler_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battler_id"], name: "index_league_invitations_on_battler_id"
    t.index ["league_id"], name: "index_league_invitations_on_league_id"
  end

  create_table "leagues", force: :cascade do |t|
    t.string "league_name"
    t.string "league_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "league_score"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "scores", force: :cascade do |t|
    t.bigint "battler_id", null: false
    t.bigint "battle_vote_id", null: false
    t.integer "value"
    t.integer "outcome"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_vote_id"], name: "index_scores_on_battle_vote_id"
    t.index ["battler_id"], name: "index_scores_on_battler_id"
  end

  create_table "social_media_links", force: :cascade do |t|
    t.string "url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.integer "social_media_platform_id"
    t.index ["social_media_platform_id"], name: "index_social_media_links_on_social_media_platform_id"
    t.index ["user_id"], name: "index_social_media_links_on_user_id"
  end

  create_table "social_media_platforms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.text "email", default: "", null: false
    t.text "encrypted_password", default: "", null: false
    t.text "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "jti", null: false
    t.boolean "is_verified", default: false
    t.string "username", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "voter_awards", force: :cascade do |t|
    t.bigint "voter_id", null: false
    t.bigint "award_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["award_id"], name: "index_voter_awards_on_award_id"
    t.index ["voter_id"], name: "index_voter_awards_on_voter_id"
  end

  create_table "voters", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_voters_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "battle_votes", "battles"
  add_foreign_key "battle_votes", "voters"
  add_foreign_key "battler_awards", "awards"
  add_foreign_key "battler_awards", "battlers"
  add_foreign_key "battler_battle_results", "battlers"
  add_foreign_key "battler_battle_results", "battles"
  add_foreign_key "battler_battles", "battlers"
  add_foreign_key "battler_battles", "battles"
  add_foreign_key "battler_followers", "battlers"
  add_foreign_key "battler_followers", "users"
  add_foreign_key "battler_follows", "battlers"
  add_foreign_key "battler_follows", "users"
  add_foreign_key "battlers", "leagues"
  add_foreign_key "battlers", "users"
  add_foreign_key "battles", "leagues"
  add_foreign_key "channel_messages", "channels"
  add_foreign_key "channel_messages", "users"
  add_foreign_key "channel_users", "channels"
  add_foreign_key "channel_users", "users"
  add_foreign_key "crew_chat_messages", "crew_chats"
  add_foreign_key "crew_chat_messages", "users"
  add_foreign_key "crew_chat_users", "crew_chats"
  add_foreign_key "crew_chat_users", "users"
  add_foreign_key "crew_chats", "crews"
  add_foreign_key "crews", "users"
  add_foreign_key "events", "leagues"
  add_foreign_key "league_admins", "leagues"
  add_foreign_key "league_admins", "users"
  add_foreign_key "league_awards", "awards"
  add_foreign_key "league_awards", "leagues"
  add_foreign_key "league_chat_messages", "league_chats"
  add_foreign_key "league_chat_messages", "users"
  add_foreign_key "league_chat_users", "league_chats"
  add_foreign_key "league_chat_users", "users"
  add_foreign_key "league_chats", "leagues"
  add_foreign_key "league_invitations", "battlers"
  add_foreign_key "league_invitations", "leagues"
  add_foreign_key "posts", "users"
  add_foreign_key "scores", "battle_votes"
  add_foreign_key "scores", "battlers"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
  add_foreign_key "voter_awards", "awards"
  add_foreign_key "voter_awards", "voters"
  add_foreign_key "voters", "users"
end
