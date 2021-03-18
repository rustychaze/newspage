from flask import Flask
from flask import request
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)

@app.route('/')
def index():
    return 'Index Page'

@app.route('/api/article/')
def hello():
    articles = [ 1,2,3,4,5,6,7,8,9,10 ]
    return {
        "articles": articles
    }

# GET
@app.route('/api/article/<int:art_id>', methods=['GET'])
def get_article_by_id( art_id ):
    conn = psycopg2.connect(dbname='rust_test', user='rust', 
                        password='rust', host='localhost')
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "SELECT * FROM articles WHERE id = {};".format(art_id)
    )
    row = cursor.fetchall()
    return row[0]

# PUT
@app.route('/api/article/', methods=['PUT'])
def create_new_article():
    for line in request.form:
        print( line )

    # conn = psycopg2.connect(dbname='rust_test', user='rust', 
    #                 password='rust', host='localhost')
    # cursor = conn.cursor(cursor_factory=RealDictCursor)

    # cursor.execute(
    #     "INSERT INTO articles (id, head, body) VALUES ({}, {}, {} );".format(request.form['id'],request.form['head'],request.form['body'] )
    # )
    return {
        "status": True
    }



# TODO:
# POST
# DELETE