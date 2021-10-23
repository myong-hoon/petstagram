import boto3
#s3 서버에 파일 저장하는 함수
def upload_to_aws(local_file, bucket, s3_file,ACCESS_KEY,SECRET_KEY):
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

