import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json
import sys
 

data = {}
data['tasks'] = []

# Use a service account
cred = credentials.Certificate('../src/config/python-conf.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def backup_tasks():
    users_ref = db.collection(u'tasks')
    docs = users_ref.stream()


    for doc in docs:
        task = doc.to_dict()
        task['id'] = doc.id
        data['tasks'].append(task)

    with open('./data/backup/tasks.json', 'w') as outfile:
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

    with open('./data/backup/activities.json', 'w') as outfile:
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

    with open('./data/backup/dailyPerformances.json', 'w') as outfile:
        json.dump(data, outfile)

def backup_goals():
    data = {}
    data['goals'] = []

    users_ref = db.collection(u'goals').order_by(
        u'order', direction=firestore.Query.DESCENDING)
    docs = users_ref.stream()

    for doc in docs:
        tosave = doc.to_dict()
        tosave['id'] = doc.id
        tosave.pop('dateTimeCreated', None)
        data['goals'].append(tosave)

    with open('./data/backup/goals.json', 'w') as outfile:
        json.dump(data, outfile)
        

if len(sys.argv) == 2 and sys.argv[1] == '-h':
    print("Command for backup carpe-diem data")
    print("-a ... Activities")
    print("-t ... Tasks")
    print("-d ... Daily Performances")
    print("-g ... Goals")
    print("without any flag - backups all")

if len(sys.argv) == 1:
    print("Backups All, for specific - see help (flag -h)")
    backup_goals()
    backup_dailyPerformances()
    backup_tasks()
    backup_activities()

if len(sys.argv) == 2 and sys.argv[1] == '-a':
    print("Getting Activities...")
    backup_activities()    
    print("Done!")

if len(sys.argv) == 2 and sys.argv[1] == '-d':
    print("Getting Daily Performances...")
    backup_dailyPerformances()    
    print("Done!")

if len(sys.argv) == 2 and sys.argv[1] == '-g':
    print("Getting Goals...")
    backup_goals()    
    print("Done!")

if len(sys.argv) == 2 and sys.argv[1] == '-t':
    print("Getting Tasks...")
    backup_tasks()    
    print("Done!")
