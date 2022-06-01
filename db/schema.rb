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

ActiveRecord::Schema[7.0].define(version: 2022_06_01_103649) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

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
    t.index ["league_id"], name: "index_battlers_on_league_id"
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

  create_table "leagues", force: :cascade do |t|
    t.string "league_name"
    t.string "league_url"
    t.string "league_owner"
    t.string "league_logo"
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

  create_table "user_battlers", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "battler_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["battler_id"], name: "index_user_battlers_on_battler_id"
    t.index ["user_id"], name: "index_user_battlers_on_user_id"
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

  add_foreign_key "battler_battles", "battlers"
  add_foreign_key "battler_battles", "battles"
  add_foreign_key "battlers", "leagues"
  add_foreign_key "battles", "leagues"
  add_foreign_key "posts", "users"
  add_foreign_key "user_battlers", "battlers"
  add_foreign_key "user_battlers", "users"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
end
