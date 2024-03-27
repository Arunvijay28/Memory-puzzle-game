begin
    require 'securerandom'
    require 'io/console'
  rescue LoadError
    puts 'Error in importing package.'
  end
  
  class Card
    attr_reader :val, :cor
  
    def initialize(v, x, y)
      @val = v
      @cor = [x, y]
    end
  
    def to_s
      "#{@val} is at #{@cor}"
    end
  end
  
  class Game
    def initialize(n, choice)
      @dim = n
      @grid = Array.new(n) { Array.new(n, 0) }
      @mode = choice
      @num = (1..(n + 1)**2).to_a
      @alpha = ('A'..'Z').to_a
      @hidden = Array.new(n) { Array.new(n, '*') }
    end
  
    def free_cells
      cells = []
      (0...@dim).each do |i|
        (0...@dim).each do |j|
          cells << [i, j] if @grid[i][j].zero?
        end
      end
      cells
    end
  
    def grid_set
      val = @mode == 1 ? @num : @alpha
      free = free_cells
  
      while free.any? && val.any?
        random_pos_1 = free.sample
        free.delete(random_pos_1)
        random_pos_2 = free.sample
        free.delete(random_pos_2)
        random_val = val.sample
  
        @grid[random_pos_1[0]][random_pos_1[1]] = Card.new(random_val, random_pos_1[0], random_pos_1[1])
        @grid[random_pos_2[0]][random_pos_2[1]] = Card.new(random_val, random_pos_2[0], random_pos_2[1])
        val.delete(random_val)
      end
  
      @grid.each { |row| row.each { |card| puts card } }
    end
  
    def getele(pos)
      @grid[pos[0]][pos[1]]
    end
  
    def play
      c = @dim**2
      puts "..Memory Match Game Starting.."
  
      while c.positive?
        puts @hidden.map(&:inspect)
        print "Enter the position that you want to search in the format x y: "
        in_1 = gets.chomp.split.map(&:to_i)
        puts getele(in_1)
  
        print "Enter the position that you want to search in the format x y: "
        in_2 = gets.chomp.split.map(&:to_i)
        puts getele(in_2)
  
        if getele(in_1).val == getele(in_2).val
          puts "That's a Match"
          @hidden[in_1[0]][in_1[1]] = getele(in_1).val
          @hidden[in_2[0]][in_2[1]] = getele(in_2).val
          c -= 2
        else
          puts "Try again"
        end
      end
  
      puts "Game Ended"
      puts @hidden.map(&:inspect)
    end
  end
  
  # Main Program
  if __FILE__ == $PROGRAM_NAME
    mem_match = Game.new(12, 1)
    mem_match.grid_set
    mem_match.play
  end
  