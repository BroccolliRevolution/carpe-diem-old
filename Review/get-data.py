import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

data = {}
data['tasks'] = []


# Use a service account
cred = credentials.Certificate('../src/config/python-conf.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

users_ref = db.collection(u'tasks')
docs = users_ref.stream()

def color(x):
  res = '#9bd771'
  if x > 80:
    res = 'yellow'
  return res

for doc in docs:
    data['tasks'].append({
        'id': doc.id,
        'importance': doc.to_dict()['importance'],
        'color': color(doc.to_dict()['importance'])
    })
 #   print(f'{doc.id} => {doc.to_dict()}')

with open('./data/data.json', 'w') as outfile:
    json.dump(data, outfile)
