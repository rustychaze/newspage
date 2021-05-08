from flask import Flask
from flask import request
import psycopg2
from psycopg2.extras import RealDictCursor
from psycopg2.pool import SimpleConnectionPool
from contextlib import contextmanager
import json

app = Flask(__name__)

# pool
db_pool = SimpleConnectionPool(1, 10,
                               dbname='postgres', user='rust',
                               password='rust', host='localhost')


@contextmanager
def db():
    con = db_pool.getconn()
    cur = con.cursor(cursor_factory=RealDictCursor)
    try:
        yield con, cur
    finally:
        cur.close()
        db_pool.putconn(con)


# GET

@app.route('/')
def index():
    return 'Index Page'

@app.route('/api/article/pages/<int:page>', methods=['GET'])
def get_page(page):
    return get_page_common(page)

@app.route('/api/article/', methods=['GET'])
def get_main_page():
    return get_page_common(1)

def get_page_common(page):
    articles = []
    error = ""
    with db() as (connection, cursor):
        try:
            cursor.execute(
                "SELECT COUNT(*) FROM articles;"
            )
            result = cursor.fetchone()
            count = result['count']
            pages = count%10
            pages += 1  
            if (page < 1) or (page > pages):
                raise Exception ('page number has to be >= 1 and not exceed total number of pages')       
            offset = (page-1)*10
            if page < 1 or None:
                raise Exception ('number must be not less than 1')
            cursor.execute(
                "SELECT id, head, body FROM articles ORDER BY id desc LIMIT 10 OFFSET {};".format(offset)
            )
            row = cursor.fetchall()
            for r in row:
                articles.append({'id': r['id'], 'head': r['head'], 'body': r['body']})
        except psycopg2.Error as db_error:
            error = db_error
            print('Database error:', db_error)
        except Exception as ex:
            error = ex
            print('General error:', ex)
    return {
        "articles": articles,
        "current_page": page,
        "pages": pages,
        "error": error
    }


# PUT


@app.route('/api/article/', methods=['PUT'])
def create_new_article():
    result = True
    err = ""
    print (request.json)
    #data=json.loads(request.json)
    with db() as (connection, cursor):
        try:
            cursor.execute(
                "INSERT INTO articles (head, body) VALUES ('{}', '{}');".format(
                    request.json['head'], request.json['body'])
            )
            connection.commit()
        except psycopg2.Error as error:
            print('Database error:', error)
            result = False
            err = error
        except Exception as ex:
            print('General error:', ex)
            result = False
            err = str(ex)

    return {
        "status": result,
        "error": err
    }


# DELETE


@app.route('/api/article/<int:art_id>', methods=['DELETE'])
def del_article_by_id(art_id):
    result = True
    err = ""
    with db() as (connection, cursor):
        try:
            cursor.execute(
                "DELETE FROM articles WHERE id = {};".format(art_id)
            )
            connection.commit()
        except psycopg2.Error as error:
            print('Database error:', error)
            result = False
            err = error
        except Exception as ex:
            print('General error:', ex)
            result = False
            err = str(ex)
    return {
        "status": result,
        "error": err
    }


# POST


@app.route('/api/article/', methods=['POST'])
def update_article():
    result = True
    err = ""
    with db() as (connection, cursor):
        try:
            cursor.execute(
                "UPDATE articles SET head = %s, body = %s where id = %s;", (request.json['head'], request.json['body'], int(request.json['id']))
            )
            connection.commit()
        except psycopg2.Error as error:
            print('Database error:', error)
            result = False
            err = error
        except Exception as ex:
            print('General error:', ex)
            result = False
            err = str(ex)
    return {
        "status": result,
        "error": err
    }