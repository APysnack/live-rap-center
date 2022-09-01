# regex notes:
# anything between // is a regex
# i after the second / makes it case insensitive (e.g. /foo/i will detect the string "FOO")
# [\w .]* <-- accepts any items in the array any number of times. You can use A-Z instead of \w but \w is short for a word

# below is a break down of (?=\s*(?:[:-]|host|$))
# $= <-- positive lookahead, requires the following pattern to match immediately after
# \s* <-- whitespace (0 or more)
# (?:) <-- non-capturing group. groups them together, but we dont care about retrieving this string from the results
# [:-]|host|$ <-- one of any combination of :- host or a newline ($)


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


    # format: "battler1 vs battler2" with any other symbols preceding or following
    # known failures: 
    # "k-shine vs dna" since the symbol - appears in the name
    # "battler1 vs battler2: rap battle" because of symbol
    # kings vs queens smack battle battler1 vs battler2
    def default_format(title)
        battlers = []
        if title.include?("vs") || title.include?("VS")
            regex = /([\w .']*) vs ([\w .']*?)(?=\s*(?:[:-]|host|$))/i
            matches = title.match(regex).captures
            battlers.push(matches[0].strip())
            battlers.push(matches[1].strip())
            battlers
        else
            battlers
        end
    end
end