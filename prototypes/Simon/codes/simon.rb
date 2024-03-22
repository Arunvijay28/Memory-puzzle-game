cp=[]
user=[]
score=1

loop do
    cp<<rand(0...10)
    print "in memory #{cp}\n"
    score.times do |i|
        p "\n enter a no:"
        user_guess=gets.chomp.to_i
        user<<user_guess
    end

    match=true
    cp.each_with_index do |num,i|       # enumerator in python
        if num!=user[i]
            match=false
            break
        end

    end
    if match
        p "correctly guessed"
        score+=1
    else
        print "game over score:#{score-1}"
        break
    end
    
    user=[]
end
