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

ActiveRecord::Schema[7.0].define(version: 2022_06_26_195131) do
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

  create_table "battler_battles", force: :cascade do |t|
    t.bigint "battler_id", null: false
    t.bigint "battle_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battle_id"], name: "index_battler_battles_on_battle_id"
    t.index ["battler_id"], name: "index_battler_battles_on_battler_id"
  end

  create_table "battlers", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "league_id"
    t.bigint "user_id"
    t.integer "score", default: 0
    t.integer "booking_price", default: 0
    t.boolean "booking_price_enabled", default: false
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
    t.index ["league_id"], name: "index_battles_on_league_id"
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
    t.string "username"
    t.boolean "is_verified", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "battler_battles", "battlers"
  add_foreign_key "battler_battles", "battles"
  add_foreign_key "battlers", "leagues"
  add_foreign_key "battlers", "users"
  add_foreign_key "battles", "leagues"
  add_foreign_key "league_admins", "leagues"
  add_foreign_key "league_admins", "users"
  add_foreign_key "league_invitations", "battlers"
  add_foreign_key "league_invitations", "leagues"
  add_foreign_key "posts", "users"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
end
