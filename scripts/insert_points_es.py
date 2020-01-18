import sys

import boto3
from aws_requests_auth.aws_auth import AWSRequestsAuth
from elasticsearch import Elasticsearch, RequestsHttpConnection

es_host = 'https://search-geopoints-27r7jwdphujaer34pkq5u5znxe.us-east-2.es.amazonaws.com'

es = Elasticsearch(es_host)

# TODO: add error message if incorrect args
inputFile = sys.argv[1]

esPoints = []

# Parse input file to create payloads for writing to ES
# TODO: add error handling if file fails to open
with open(inputFile, 'r') as locations:
    for location in locations:
        location = location.strip().split(';')
        
        area = location[2].split(' ')[-2]

        esPoint = {
            'index': 'australia',
            'type': area,
            'doc': {
                'text': location[2], # Address
                'location': { 
                'lat': float(location[0]), #Latitude
                'lon': float(location[1]) #Longitude
                }
            }
        }
        
        esPoints.append(esPoint)

esPoint = esPoints[0]
print(esPoint)

# Write into ES cluster
for esPoint in esPoints:
    print(esPoint)
    es.index(index=esPoint['index'], doc_type='_doc', body=esPoint['doc'])
