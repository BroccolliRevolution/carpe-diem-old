import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

data = {}
data['tasks'] = []


# Use a service account
cred = credentials.Certificate('/home/peto/Code/carpe-diem/src/config/python-conf.json')
firebase_admin.initialize_app(cred)

db = firestore.client()




def backup_tasks():
    users_ref = db.collection(u'tasks')
    docs = users_ref.stream()


    for doc in docs:
        task = doc.to_dict()
        task['id'] = doc.id
        data['tasks'].append(task)

    with open('/home/peto/Code/carpe-diem/Review/data/backup/tasks.json', 'w') as outfile:
        json.dump(data, outfile)


def getDateFormated(val1):
    year,month,day,hour,minute,second,tzinfo = val1.year,val1.month,val1.day,val1.hour, val1.minute, val1.second, val1.tzinfo
    utc_time  = "%s-%s-%s %s:%s:%s.%s"%(year, month, day,hour,minute,second,tzinfo)
    return utc_time


def backup_activities():
    data = {}
    data['activities'] = []

    users_ref = db.collection(u'activities').order_by(
        u'date', direction=firestore.Query.DESCENDING)
    docs = users_ref.stream()

    for doc in docs:
        tosave = doc.to_dict()
        tosave['id'] = doc.id
        tosave['date'] = getDateFormated(tosave['date'])
        data['activities'].append(tosave)

    with open('/home/peto/Code/carpe-diem/Review/data/backup/activities.json', 'w') as outfile:
        json.dump(data, outfile)


def backup_dailyPerformances():
    data = {}
    data['dailyPerformances'] = []

    users_ref = db.collection(u'dailyPerformances').order_by(
        u'date', direction=firestore.Query.DESCENDING)
    docs = users_ref.stream()

    for doc in docs:
        tosave = doc.to_dict()
        tosave['id'] = doc.id
        tosave['date'] = getDateFormated(tosave['date'])
        data['dailyPerformances'].append(tosave)

    with open('/home/peto/Code/carpe-diem/Review/data/backup/dailyPerformances.json', 'w') as outfile:
        json.dump(data, outfile)

def backup_goals():
    data = {}
    data['goals'] = []

    users_ref = db.collection(u'goals').order_by(
        u'date', direction=firestore.Query.DESCENDING)
    docs = users_ref.stream()

    for doc in docs:
        tosave = doc.to_dict()
        tosave['id'] = doc.id
        #print(tosave['datetime'])
        #tosave['datetime'] = getDateFormated(tosave['datetime'])
        tosave.pop('datetime', None)
        data['goals'].append(tosave)

    with open('/home/peto/Code/carpe-diem/Review/data/backup/goals.json', 'w') as outfile:
        json.dump(data, outfile)
        


backup_goals()
# backup_dailyPerformances()
# backup_tasks()
# backup_activities()