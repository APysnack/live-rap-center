require 'cgi'
require './app/services/video_fetcher/keywords.rb'

module VideoFetcher
  class TitleSanitizer
    # imports from keywords.rb
    STRINGS_TO_REMOVE = VideoFetcher::Keywords::STRINGS_TO_REMOVE
    KEY_WORDS = VideoFetcher::Keywords::KEY_WORDS
    
    attr_accessor :base_title, :delimiter, :is_tag_match, :is_triple_threat, :battlers

    def initialize(title)
      @base_title = sanitize_string(title)
      @delimiter = nil
      @is_tag_match = false
      @is_triple_threat = false
      @battlers = parse_title
    end

    def parse_title
      check_if_tag_match
      check_if_triple_threat

      return tag_team_format if is_tag_match
      return triple_threat_format if is_triple_threat
      return standard_format
    end

    def standard_format
      partitions = split_string_by_vs
      
      left_name = split_left(partitions[0])
      left_name = remove_keywords(left_name, 'left')
      left_name = remove_parentheses(left_name);
      
      right_name = split_right(partitions[1])
      right_name = remove_keywords(right_name, 'right')
      right_name = remove_parentheses(right_name);

      [left_name, right_name]
    end

    def tag_team_format
      partitions = split_string_by_vs

      left_names = split_by_delimiter(partitions[0])
      right_names = split_by_delimiter(partitions[1])

      battler_1 = split_left(left_names[0])
      battler_2 = split_right(left_names[1])
      battler_3 = split_left(right_names[0])
      battler_4 = split_right(right_names[1])

      [battler_1, battler_2, battler_3, battler_4];
    end

    def triple_threat_format
      partitions = split_string_by_vs_triple

      left_name = split_left(partitions[0])
      right_name = split_right(partitions[2])
      middle_name = split_left(partitions[1])
      middle_name = split_right(partitions[1])

      [left_name, middle_name, right_name]
    end

    private

    def split_by_delimiter(input_string)
      pattern = /^(.*)#{Regexp.escape(delimiter)}(.*)$/i
      match_result = input_string.match(pattern)
    
      if match_result
        left, right = match_result[1].strip, match_result[2].strip
        return [left, right]
      end
    
      ['', '']
    end

    def split_string_by_vs
      pattern = /(.*?)(?:\[VS\]|VS\.|-VS-|VS)(.*)/i
      match_result = base_title.match(pattern)
    
      if match_result
        left, right = match_result[1].strip, match_result[2].strip
        return [left, right]
      end
    
      return ['', '']
    end

    def split_string_by_vs_triple
      pattern = /(.*?)(?:\s*VS\s*)(.*?)(?:\s*VS\s*|-VS-|VS)(.*)/i
      match_result = base_title.match(pattern)
    
      if match_result
        _, first_part, second_part, third_part = match_result.to_a
        [first_part.strip, second_part.strip, third_part.strip]
      else
        ['', '', '']
      end
    end

    def split_left(input_string)
      pattern = /(\W\s)/
      result = input_string.split(pattern)
      result.last.upcase
    end

    def split_right(input_string)
      pattern = /(\s\W)/
      result = input_string.split(pattern)
      result.first.upcase
    end

    def remove_keywords(input_string, title_side)
      regex_pattern = Regexp.new("(#{KEY_WORDS.join('|')})", 'i')
      result = input_string.split(regex_pattern)
    
      if title_side == 'left'
        return result.last&.strip || ''
      else
        return result.first&.strip || ''
      end
    end

    def remove_parentheses(input_string)
      regex = /\([^)]*\)/
      input_string.gsub(regex, '').strip
    end
    
    def check_if_triple_threat
      @is_triple_threat = (base_title.scan(/VS/i) || []).length == 2
    end

    def check_if_tag_match
      set_tag_match('&') if (base_title.scan(/&/).length) >= 2
      set_tag_match('AND') if (base_title.scan(/\band\b/i).length) >= 2
    end

    def set_tag_match(delimiter)
      @is_tag_match = true
      @delimiter = delimiter
    end

    # removes problematic substrings 
    # e.g. Kings vs Queens adds a misleading vs in the title
    # also removes any HTML entities e.g. &amp;
    def sanitize_string(input_string)
      return nil unless input_string.is_a?(String)
      sanitized_string = CGI.unescapeHTML(input_string)
    
      STRINGS_TO_REMOVE.each do |substring|
        regex = Regexp.new(substring, Regexp::IGNORECASE)
        sanitized_string.gsub!(regex, '')
      end
      
      sanitized_string
    end
  end
end