task update_league_scores: :environment do 
    leagues = League.all
    leagues.each do |league|
        if league.battlers.count > 0
            new_score = league.battlers.map(&:score).sum / league.battlers.count
            league.league_score = new_score
            league.save
        end
    end
end