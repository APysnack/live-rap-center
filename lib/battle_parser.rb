# regex notes:
# anything between // is a regex
# i after the second / makes it case insensitive


module BattleParser
    def parse_title(league_name, title)
        if league_name == "iBattle"
            trailing_dash_format(title)
        end
    end


    # emcee 1 vs emcee 2 - ibattle
    # ibattle
    def trailing_dash_format(title)
        battlers = []
        begin
            if title.include?("vs") || title.include?("VS")
                battler_1 = title.split(/ vs /, 2)[0]
                trailing_string = title.split(/ vs /, 2)[1].upcase
                battler_2 = trailing_string.split(/ -/, 2)[0].upcase
                battlers.push(battler_1)
                battlers.push(battler_2)
            else
                battlers
            end
        rescue
            battlers
        end
    end
end