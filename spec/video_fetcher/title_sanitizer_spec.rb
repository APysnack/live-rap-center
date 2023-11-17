# title_sanitizer_spec.rb

require 'spec_helper'
require 'rails_helper'
require './app/services/video_fetcher/title_sanitizer.rb'

describe VideoFetcher::TitleSanitizer do
  it 'parses A Name vs B Name correctly' do
    ts = VideoFetcher::TitleSanitizer.new("Mac Miller vs Jim Jones")
    expect(ts.battlers).to eq(["MAC MILLER", "JIM JONES"])
  end

  it 'parses KOTD - Rap Battle - Real Deal vs Bizzo Bond | #KOTDS1 Exhibition correctly' do
    ts = VideoFetcher::TitleSanitizer.new("KOTD - Rap Battle - Real Deal vs Bizzo Bond | #KOTDS1 Exhibition")
    expect(ts.battlers).to eq(["REAL DEAL", "BIZZO BOND"])
  end

  it 'parses KING BROOK vs PURELYDEF - iBattleTV correctly' do
    ts = VideoFetcher::TitleSanitizer.new("KING BROOK vs PURELYDEF - iBattleTV")
    expect(ts.battlers).to eq(["KING BROOK", "PURELYDEF"])
  end

  it 'parses RemyD vs Coma hosted by Pat Stay correctly' do
    ts = VideoFetcher::TitleSanitizer.new("RemyD vs Coma hosted by Pat Stay")
    expect(ts.battlers).to eq(["REMYD", "COMA"])
  end

  it 'parses HOMESKOOL & LORD GIOVANNI vs KANG & CASHIS CLAY - iBattleTV (House of Lords vs Chain Gang) correctly' do
    ts = VideoFetcher::TitleSanitizer.new("HOMESKOOL & LORD GIOVANNI vs KANG & CASHIS CLAY - iBattleTV (House of Lords vs Chain Gang)")
    expect(ts.battlers).to eq(["HOMESKOOL", "LORD GIOVANNI", "KANG", "CASHIS CLAY"])
  end

  it 'parses SHOWTIME BATTLE ARENA: RASHAAD THA GOD AND LA FROSS VS OSIRIS AND KI - HOSTED BY FOO correctly' do
    ts = VideoFetcher::TitleSanitizer.new("SHOWTIME BATTLE ARENA: RASHAAD THA GOD AND LA FROSS VS OSIRIS AND KI - HOSTED BY FOO")
    expect(ts.battlers).to eq(["RASHAAD THA GOD", "LA FROSS", "OSIRIS", "KI"])
  end

  it 'parses REAL NAME BRANDON vs PATRON battle correctly' do
    ts = VideoFetcher::TitleSanitizer.new("REAL NAME BRANDON vs PATRON battle")
    expect(ts.battlers).to eq(["REAL NAME BRANDON", "PATRON"])
  end

  it 'parses 413 Battle League - Uno Lavoz vs 3SK co-host Chilla Jones correctly' do
    ts = VideoFetcher::TitleSanitizer.new("413 Battle League - Uno Lavoz vs 3SK co-host Chilla Jones")
    expect(ts.battlers).to eq(["UNO LAVOZ", "3SK"])
  end

  it 'parses 413 Battle League - JeFFrey (CT) vs Flash da Gator (MA) hosted by Lush One correctly' do
    ts = VideoFetcher::TitleSanitizer.new("413 Battle League - JeFFrey (CT) vs Flash da Gator (MA) hosted by Lush One")
    expect(ts.battlers).to eq(["JEFFREY", "FLASH DA GATOR"])
  end

  it 'parses 40 B.A.R.R.S vs CHETTA QOTR presented by BABS BUNNY & VAGUE' do
    ts = VideoFetcher::TitleSanitizer.new("40 B.A.R.R.S vs CHETTA QOTR presented by BABS BUNNY & VAGUE")
    expect(ts.battlers).to eq(["40 B.A.R.R.S", "CHETTA"])
  end

  it 'parses 413 Battle League Presents Cityy Towers vs 3SK' do
    ts = VideoFetcher::TitleSanitizer.new("413 Battle League Presents Cityy Towers vs 3SK")
    expect(ts.battlers).to eq(["CITYY TOWERS", "3SK"])
  end

  it 'parses Battleground Dallas "THE REAFFIRMATION"- STREET CAMMO VS G NUTTY' do
    ts = VideoFetcher::TitleSanitizer.new('Battleground Dallas "THE REAFFIRMATION"- STREET CAMMO VS G NUTTY')
    expect(ts.battlers).to eq(["STREET CAMMO", "G NUTTY"])
  end

  it 'parses AHAT Rap Battles Aries vs TBG(tryout)' do
    ts = VideoFetcher::TitleSanitizer.new("AHAT Rap Battles Aries vs TBG(tryout)")
    expect(ts.battlers).to eq(["ARIES", "TBG"])
  end

  it 'parses Face Off Battle League: PastLyfe vs SK vs Rames the Last Pharoah' do
    ts = VideoFetcher::TitleSanitizer.new("Face Off Battle League: PastLyfe vs SK vs Rames the Last Pharoah")
    expect(ts.battlers).to eq(["PASTLYFE", "SK", "RAMES THE LAST PHAROAH"])
  end

  it 'parses URL PRESENTS KINGS VS QUEENS: ARSONAL VS OFFICIAL' do
    ts = VideoFetcher::TitleSanitizer.new("URL PRESENTS KINGS VS QUEENS: ARSONAL VS OFFICIAL")
    expect(ts.battlers).to eq(["ARSONAL", "OFFICIAL"])
  end

  it 'parses LUMINOUS vs MACKENZIE - iBattleTV (USA vs SCOTLAND RAP BATTLE)' do
    ts = VideoFetcher::TitleSanitizer.new("LUMINOUS vs MACKENZIE - iBattleTV (USA vs SCOTLAND RAP BATTLE)")
    expect(ts.battlers).to eq(["LUMINOUS", "MACKENZIE"])
  end
end
