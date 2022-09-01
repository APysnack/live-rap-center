# regex notes:
# anything between // is a regex
# i after the second / makes it case insensitive


module BattleParser
    def parse_title(league_name, title)
        begin
            if league_name == "leagueNameHere"
                return "placeholder for future function"
            else
                default_format(title) 
            end
        rescue
            battlers = [] 
        end
    end


    # format: { battler1 vs battler2 } with any other symbols preceding or following
    def default_format(title)
        battlers = []
        if title.include?("vs") || title.include?("VS")
            matches = title.match(/([0-9A-Z ]*) vs ([0-9A-Z ]*)/i).captures
            matches.each do |match|
                battlers.push(match.strip())
            end
            battlers
        else
            battlers
        end
    end
end