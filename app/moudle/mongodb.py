import s3ImgUpload

array = 'laster'

def getPetList(db):
    print(array+'aaa')
    if array=='laster':
        pet_lists = list(db.petstagram.find({}, {'_id': False}))
        pet_lists.reverse()
        return pet_lists
    elif array=='monthly_heart':
        pet_lists = list(db.petstagram.find({}, {'_id': False}))
        pet_lists=sorted(pet_lists, key=(lambda x: x['monthlyHeart']), reverse=True)
        return pet_lists
    elif array=='weekly_heart':
        pet_lists = list(db.petstagram.find({}, {'_id': False}))
        pet_lists=sorted(pet_lists, key=(lambda x: x['weeklyHeart']), reverse=True)
        return pet_lists
    elif array=='heart':
        pet_lists = list(db.petstagram.find({}, {'_id': False}))
        pet_lists=sorted(pet_lists, key=(lambda x: x['heart']), reverse=True)
        return pet_lists
    else:
        print('error')
        return
    