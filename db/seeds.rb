ActiveRecord::Base.transaction do
    seedfile = ENV['SEED_FILE'] || 'development'
    seed_file = "#{Rails.root}/db/seeds/#{seedfile}.rb"
    
    if File.exists?(seed_file)
      puts "-- Seeding data from file: #{seedfile}"
      require seed_file
    else
      puts "-- Seed file not found: #{seedfile}"
    end
end
