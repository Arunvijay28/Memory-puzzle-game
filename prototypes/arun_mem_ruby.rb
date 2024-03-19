class Card
    attr_reader :val,:cor
    def initialize(v,x,y)
        @val=v
        @cor=[x,y]
    end

    def get_val()
        @val
    end

    def get_cor
        @cor
    end

    def to_s
        return "#{@val} is at #{@cor}"
    end
end

class Game
    def initialize(n,choice)
        @dim=n    
        @grid=Array.new(n){Array.new(n,0)}
        @mode=choice
        @num=(1..(n+1)**2).to_a
        @alpha=('A'..'Z').to_a
        @hidden=Array.new(n){Array.new(n,'*')}
    end

    def free_cells
        cell=[]
        (0...@dim).each do |i|
            (0...@dim).each do |j|
                cell<<[i,j] if @grid[i][j]==0
            end
        end
        cell
    end

    def grid_set
        val = @mode==1 ? @num : @alpha
        free=free_cells

        while free.any? && val.any?

            ran_pos_1=free.sample
            free.delete(ran_pos_1)
            ran_pos_2=free.sample
            free.delete(ran_pos_2)
            random_val=val.sample
            @grid[ran_pos_1[0]][ran_pos_1[1]]=Card.new(random_val,ran_pos_1[0],ran_pos_1[1])
            @grid[ran_pos_2[0]][ran_pos_2[1]]=Card.new(random_val,ran_pos_2[0],ran_pos_2[1])
            val.delete(random_val)
        end
    end

    def getele(pos)
        return @grid[pos[0]][pos[1]]
    end

    def play
        c=@dim**2
        p "game starts"
        while c>0
            print "Enter the position that you want to search in the format x y: "
            in_1 = gets.chomp.split.map(&:to_i)
            puts getele(in_1)
      
            print "Enter the position that you want to search in the format x y: "
            in_2 = gets.chomp.split.map(&:to_i)
            puts getele(in_2)

            if getele(in_1).val== getele(in_2).val
                @hidden[in_1[0]][in_1[1]]=getele(in_1).val
                @hidden[in_2[0]][in_2[1]]=getele(in_2).val

                p "thats a match"
                c-=2
            else
                p "\n try again"
            end

            print "Game Ended"
        end

    end

end

if __FILE__ == $PROGRAM_NAME
    mem_match = Game.new(12, 1)
    mem_match.grid_set
    mem_match.play
  end
  