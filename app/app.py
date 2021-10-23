from flask import Flask, render_template, jsonify, request
import sys
import security
from pymongo import MongoClient
import boto3
from botocore.exceptions import NoCredentialsError

sys.path.append('/Users/yongyong/Desktop/petstagram')

app = Flask(__name__)

ACCESS_KEY = security.ACCESS_KEY
SECRET_KEY = security.SECRET_KEY

client = MongoClient(security.mongo, security.mongoPORT)
db = client.dbsparta






def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)
    try:
        print(s3.upload_file(local_file, bucket, s3_file))
        return True
    except FileNotFoundError:
        print('error')
        return False
    except NoCredentialsError:
        print('error')
        return False


## HTML을 주는 부분
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/petadd')
def login():
    return render_template('petadd.html')


@app.route('/input')
def input():
    return render_template('input_box01.html')


## API 역할을 하는 부분
@app.route('/api/petlist', methods=['GET'])  # pet list를 db에서 가져와서 index.html로 보내줌
def pet_list():
    print('pet_list get 실행')
    pet_lists = list(db.petstagram.find({}, {'_id': False}))
    print('pet_list get 종료')
    return jsonify({'result': 'success', 'pet_lists': pet_lists})


@app.route('/api/cardadd', methods=['POST'])
def card_add():
    sample_receive = request.form['cards']
    print(sample_receive)
    return jsonify({'msg': 'like 연결되었습니다!'})


@app.route('/api/petadds', methods=['POST'])
def petadd():
    pet_lists = str(len(list(db.petstagram.find({}, {'_id': False})))+1)
    temp = pet_lists + 'petstagram-image.png'
    img = 'https://petstagram-image.s3.ap-northeast-2.amazonaws.com/%s' % temp
    name = request.form['name_give']
    note = request.form['note_give']
    type = request.form['type_give']
    file = request.files["file_give"]
    db.petstagram.insert_one({'name': name, 'note': note, 'type': type, 'img-url': img, 'like': 0})



    file.save('img.png')
    upload_to_aws('img.png', 'petstagram-image', temp)
    return jsonify({'msg': '등록완료!'})



#########  Like update ##########
@app.route('/api/like', methods=['POST'])
def like_pet():
    name_receive = request.form['name_give']

    target_pet = db.petstagram.find_one({'name': name_receive})

    current_like = target_pet['like']

    new_like = current_like + 1

    db.petstagram.update_one({'name': name_receive}, {'$set': {'like': new_like}})

    return jsonify({'msg': '좋아요가 올라갔습니다'})

@app.route('/api/bestpet', methods=['GET'])  # pet list를 db에서 가져와서 index.html로 보내줌
def bsetpet():
    print('best pet 실행')
    pet_lists = list(db.petstagram.find({}, {'_id': False}))
    print('best pet 종료')
    best = sorted(pet_lists, key=(lambda x: x['like']), reverse=True)
    print(best[0])
    return jsonify({'best': best})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
