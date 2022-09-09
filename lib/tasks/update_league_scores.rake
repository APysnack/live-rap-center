task update_league_scores: :environment do 
    leagues = League.all
    leagues.each do |league|
        battler_count = league.battlers.where.not(score: 0.0).count
        if battler_count > 0
            new_score = league.battlers.map(&:score).sum / battler_count
            league.league_score = new_score
            league.save
        end
    end
end