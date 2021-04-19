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


@app.route('/')
def index():
    return 'Index Page'


@app.route('/api/article/')
def get_last_10_articles():
    articles = []
    with db() as (connection, cursor):
        try:
            cursor.execute(
                "select id from articles order by id desc limit 10;"
            )
            row = cursor.fetchall()
            for r in row:
                articles.append(r['id'])
        except psycopg2.Error as error:
            print('Database error:', error)
        except Exception as ex:
            print('General error:', ex)
    return {
        "articles": articles
    }

# GET


@app.route('/api/article/<int:art_id>', methods=['GET'])
def get_article_by_id(art_id):
    result = {}
    with db() as (connection, cursor):
        try:
            cursor.execute(
                "SELECT * FROM articles WHERE id = {};".format(art_id)
            )
            row = cursor.fetchall()
            result = row[0]
        except psycopg2.Error as error:
            print('Database error:', error)
        except Exception as ex:
            print('General error:', ex)
    return result

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