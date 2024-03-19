import random,os,time
cp=[]
user=[]
score=1
sc=1

while True:
    cp.append(random.randint(0,10))
    for i in range(len(cp)):
        sc=0
        print(cp[i],end=" ")
    if sc==0:
        os.system('cls')
    for i in range(score):
        user_guess=int(input(f"\nenter {i+1} no: "))
        user.append(user_guess)
    # print("user array:",user)
    match=True
    for i in range(len(cp)):
        if cp[i]!=user[i]:
            match=False
            break
    if match:
        print("correctly guessed:")
        score+=1
    else:
        print(f"game over, your score :{score-1}")
        break
    user=[]
    