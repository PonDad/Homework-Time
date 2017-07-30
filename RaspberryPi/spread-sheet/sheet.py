from flask import Flask
from flask import request

import httplib2
import os

from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage

import moment
from datetime import datetime

try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly'
CLIENT_SECRET_FILE = 'client_secret.json'
APPLICATION_NAME = 'Google Sheets API Python Quickstart'

def get_credentials():
    home_dir = os.path.expanduser('~')
    credential_dir = os.path.join(home_dir, '.credentials')
    if not os.path.exists(credential_dir):
        os.makedirs(credential_dir)
    credential_path = os.path.join(credential_dir,
                                   'sheets.googleapis.com-python-quickstart.json')

    store = Storage(credential_path)
    credentials = store.get()
    if not credentials or credentials.invalid:
        flow = client.flow_from_clientsecrets(CLIENT_SECRET_FILE, SCOPES)
        flow.user_agent = APPLICATION_NAME
        if flags:
            credentials = tools.run_flow(flow, store, flags)
        else: # Needed only for compatibility with Python 2.6
            credentials = tools.run(flow, store)
        print('Storing credentials to ' + credential_path)
    return credentials

app = Flask(__name__)

@app.route('/yolanda_date')
def yolanda_today():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                    'version=v4')
    service = discovery.build('sheets', 'v4', http=http,
                              discoveryServiceUrl=discoveryUrl)

    spreadsheetId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    rangeName = 'data!A2:100'
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])
    if not values:
        print('No data found.')
    else :
        work_date = request.args.get("date")
        print(work_date)
        for row in values:
            if row[0] == work_date:
                print('%s %s %s' % (row[1], row[2], row[3]))
                return '%s %s %s' % (row[1],row[2], row[3])
                break
        else:
            print('none')
            return 'none'

@app.route('/amanda_date')
def amanda_today():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                    'version=v4')
    service = discovery.build('sheets', 'v4', http=http,
                              discoveryServiceUrl=discoveryUrl)

    spreadsheetId = '1CZRVoXjseU5jQlLeT_IhpFUA_1yPgvcXtMfgvinn1hM'
    rangeName = 'data!A2:100'
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])
    if not values:
        print('No data found.')
    else :
        work_date = request.args.get("date")
        print(work_date)
        for row in values:
            if row[0] == work_date:
                print('%s %s %s' % (row[1], row[2], row[3]))
                return '%s %s %s' % (row[1],row[2], row[3])
                break
        else:
            print('none')
            return 'none'

@app.route('/yolanda_period')
def yolanda_month():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                    'version=v4')
    service = discovery.build('sheets', 'v4', http=http,
                              discoveryServiceUrl=discoveryUrl)

    spreadsheetId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    rangeName = 'data!A2:100'
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])
    if not values:
        print('No data found.')
    else :
        work_period = request.args.get("date-period")
        work_month_start = moment.date(work_period[0:10])
        work_month_end = moment.date(work_period[11:21])
        work_status =[]
        for row in values:
            if moment.date(row[0]) >= work_month_start and moment.date(row[0]) <= work_month_end:
                print('%s %s' % (row[0], row[3]))
                work_status.append(row[3])
        print('%s %s' % (str(work_status.count("TRUE")).zfill(2),str(work_status.count("FALSE")).zfill(2)))
        status_true = str(work_status.count("TRUE")).zfill(2)
        status_false = str(work_status.count("FALSE")).zfill(2)
        return '%s %s' % (status_true, status_false)

@app.route('/amanda_period')
def amanda_month():
    credentials = get_credentials()
    http = credentials.authorize(httplib2.Http())
    discoveryUrl = ('https://sheets.googleapis.com/$discovery/rest?'
                    'version=v4')
    service = discovery.build('sheets', 'v4', http=http,
                              discoveryServiceUrl=discoveryUrl)

    spreadsheetId = '1CZRVoXjseU5jQlLeT_IhpFUA_1yPgvcXtMfgvinn1hM'
    rangeName = 'data!A2:100'
    result = service.spreadsheets().values().get(
        spreadsheetId=spreadsheetId, range=rangeName).execute()
    values = result.get('values', [])
    if not values:
        print('No data found.')
    else :
        work_period = request.args.get("date-period")
        work_month_start = moment.date(work_period[0:10])
        work_month_end = moment.date(work_period[11:21])
        work_status =[]
        for row in values:
            if moment.date(row[0]) >= work_month_start and moment.date(row[0]) <= work_month_end:
                print('%s %s' % (row[0], row[3]))
                work_status.append(row[3])
        print('%s %s' % (str(work_status.count("TRUE")).zfill(2),str(work_status.count("FALSE")).zfill(2)))
        status_true = str(work_status.count("TRUE")).zfill(2)
        status_false = str(work_status.count("FALSE")).zfill(2)
        return '%s %s' % (status_true, status_false)

if __name__ == '__main__':
    app.run(host="127.0.0.1", port=8080)
