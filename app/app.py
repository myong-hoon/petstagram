from flask import Flask, render_template, jsonify, request
import time
import sys
sys.path.append('/Users/yongyong/Desktop/petstagram')
sys.path.append('/Users/yongyong/Desktop/petstagram/app/moudle')
sys.path.append('/home/ubuntu/petstagram/')
sys.path.append('/home/ubuntu/petstagram/app/moudle')

import security,s3ImgUpload,mongodb
from pymongo import MongoClient

from botocore.exceptions import NoCredentialsError



app = Flask(__name__)

ACCESS_KEY = security.ACCESS_KEY
SECRET_KEY = security.SECRET_KEY
client = MongoClient(security.mongo, security.mongoPORT)
db = client.dbsparta
tm = time.localtime()
realtime = time.strftime('%Y-%m-%d%p%I%M%S', tm)

print(tm)
## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/petadd')
def login():
    return render_template('petadd.html')

@app.route('/prac')
def prac():
    return render_template('prac.html')


## API 역할을 하는 부분
@app.route('/api/getPetList', methods=['GET']) 
def getPetList():
    pet_lists= mongodb.getPetList(db)
    return jsonify({'result': 'success', 'pet_lists': pet_lists})

@app.route('/api/arrayCheck', methods=['POST'])
def arrayCheck():
    mongodb.array = request.form['arrayCheck']
    return jsonify({'msg': 'arrayCheck 연결되었습니다!'})

@app.route('/api/petadds', methods=['POST'])
def petadd():
    pet_lists = str(len(list(db.petstagram.find({}, {'_id': False})))+1)
    temp = pet_lists + realtime + '.png'
    img = 'https://petstagram-image.s3.ap-northeast-2.amazonaws.com/%s' % temp
    name = request.form['name_give']
    note = request.form['note_give']
    type = request.form['type_give']
    file = request.files["file_give"]
    db.petstagram.insert_one({'name': name, 'note': note, 'type': type, 'img-url': img, 'heart': 0, 'monthlyHeart':0,'weeklyHeart':0,'del':False,})
    file.save('img.png')
    s3ImgUpload.upload_to_aws('img.png', 'petstagram-image', temp,ACCESS_KEY,SECRET_KEY)
    return jsonify({'msg': '등록완료!'})



#########  heart update ##########
@app.route('/api/heart', methods=['POST'])
def heart():
    name_receive = request.form['name_give']

    target_pet = db.petstagram.find_one({'name': name_receive})

    current_heart = target_pet['heart']
    current_weeklyHeart=target_pet['weeklyHeart']
    current_monthlyHeart=target_pet['monthlyHeart']

    new_heart = current_heart + 1
    current_weeklyHeart = current_weeklyHeart + 1
    current_monthlyHeart = current_monthlyHeart + 1
    db.petstagram.update_one({'name': name_receive}, {'$set': {'heart': new_heart,'weeklyHeart':current_weeklyHeart,'monthlyHeart':current_monthlyHeart}})

    return jsonify({'msg': '좋아요가 올라갔습니다'})

@app.route('/api/bestpet', methods=['GET'])  # pet list를 db에서 가져와서 index.html로 보내줌
def bsetpet():
    pet_lists = list(db.petstagram.find({}, {'_id': False}))
    best = sorted(pet_lists, key=(lambda x: x['heart']), reverse=True)
    return jsonify({'best': best})

@app.route('/api/prac', methods=['GET'])  # pet list를 db에서 가져와서 index.html로 보내줌
def prac2():

    tag = ['강아지','강아지스타그램']
    forumLists = [
        {
            'type': 'new', 
            'del': False, 
            'img': 'http://www.w3bai.com/w3css/img_avatar3.png', 
            'id': 'hyhoon', 
            'note': '와 이쁘네요!!', 
        },
        {
            'type': 're', 
            'del': False,
            'img': 'http://www.w3bai.com/w3css/img_avatar3.png', 
            'id': 'hoon', 
            'note': '감솸돠', 
        },
            ]
    return jsonify(
        {'img': 'http://www.w3bai.com/w3css/img_avatar3.png',
    'userId':'hyhoon',
    'accumulateHeart': 1,
    'monthlyHeart':2,
    'weekiyHeart':3,
    'tag': tag,
    'forumLists' : forumLists,
    'heartCheck': False,
    })



if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
