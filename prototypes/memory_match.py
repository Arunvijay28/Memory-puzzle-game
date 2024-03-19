try:
    from random import *
    import sys
except:
    print("Error in importing package.")

class Card:
    def __init__(self,v,x_:int,y_:int) -> None:
        self.val=v
        self.cor=(x_,y_)
    def get_val(self):
        return self.val
    def get_cor(self):
        return self.cor
    def __str__(self)->None:
        return f"{self.val} is at {self.cor}"
    
class GAME:

    def __init__(self,n,choice:int) -> None:
        '''Given the dimension of the game and the mode of the game we create a game.'''
        self.dim=n
        self.__grid=[[0 for i in range(self.dim)] for i in range(self.dim)] #a nxn grid containing all the cards
        self.mode=choice
        self.num=[i for i in range(1,(n+1)**2)]
        self.alpha=[chr(i) for i in range(65,91)]
        self.hidden=[["*" for i in range(self.dim)] for i in range(self.dim)]

    def free_cells(self):
        cells=[]
        for i in range(self.dim):
            for j in range(self.dim):
                if self.__grid[i][j]==0:
                    cells.append([i,j])
        return cells    
    
    def grid_set(self)->None:
        #TODO:to place random pair of cards in a grid. 
        val=self.num if self.mode==1 else self.alpha
        free=self.free_cells()
        #pick 2 free cells randomly at a time and place a random card in them
        while free and val:
            random_pos_1=choice(free)
            free.remove(random_pos_1)
            random_pos_2=choice(free)
            free.remove(random_pos_2)
            random_val=choice(val)
            self.__grid[random_pos_1[0]][random_pos_1[1]]=Card(random_val,random_pos_1[0],random_pos_1[1])
            self.__grid[random_pos_2[0]][random_pos_2[1]]=Card(random_val,random_pos_2[0],random_pos_2[1])
            val.remove(random_val)
        for row in range(self.dim):
            for col in range(self.dim):
                print(self.__grid[row][col])

    def getele(self,pos:list):
        return self.__grid[pos[0]][pos[1]]

    def play(self):
        #turn based gameplay
        c=self.dim**2
        print("..Memory Match Game Starting..")
        while c>0:
            print(self.hidden)
            in_1=input("enter the pos that you want to search in the format x y:").split()
            in_pos_1=[int(i) for i in in_1]
            print(self.getele(in_pos_1))
            in_2=input("enter the pos that you want to search in the format x y:").split()
            in_pos_2=[int(i) for i in in_2]
            print(self.getele(in_pos_2))
            if self.getele(in_pos_1).val==self.getele(in_pos_2).val:
                print("That's a Match")
                self.hidden[in_pos_1[0]][in_pos_1[1]]=self.getele(in_pos_1).val
                self.hidden[in_pos_2[0]][in_pos_2[1]]=self.getele(in_pos_2).val
                c-=2
            else:
                print("Try again")
        print("Game Ended")
        print(self.hidden)

#main program
if __name__=="__main__":
    mem_match=GAME(12,1)
    mem_match.grid_set()
    mem_match.play()






