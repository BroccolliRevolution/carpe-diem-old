import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

data = {}
data['dp'] = []


# Use a service account
cred = credentials.Certificate('/home/peto/Code/carpe-diem/src/config/python-conf.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

users_ref = db.collection(u'dailyPerformances').order_by("date")
docs = users_ref.stream()

def color(x):
  res = '#9bd771'
  if x > 80:
    res = 'yellow'
  return res

for doc in docs:
    data['dp'].append({
        'id': doc.id,
        'reward': doc.to_dict()['reward'],
        'activitiesCount': doc.to_dict()['activitiesCount'],
        #'color': color(doc.to_dict()['importance'])
    })
 #   print(f'{doc.id} => {doc.to_dict()}')

with open('/home/peto/Code/carpe-diem/Review/data/data-dp.json', 'w') as outfile:
    json.dump(data, outfile)
