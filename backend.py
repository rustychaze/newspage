from flask import Flask
from flask import request
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)


@app.route('/')
def index():
    return 'Index Page'


@app.route('/api/article/')
def get_last_10_articles():
    articles = []
    conn = psycopg2.connect(dbname='postgres', user='rust',
                            password='rust', host='localhost')
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "select id from articles order by id desc limit 10;"
    )
    row = cursor.fetchall()
    for r in row:
        articles.append(r['id'])
    return {
        "articles": articles
    }

# GET


@app.route('/api/article/<int:art_id>', methods=['GET'])
def get_article_by_id(art_id):
    conn = psycopg2.connect(dbname='postgres', user='rust',
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
        print(line)

    conn = psycopg2.connect(dbname='postgres', user='rust',
                            password='rust', host='localhost')
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "INSERT INTO articles (head, body) VALUES ('{}', '{}');".format(
            request.form['head'], request.form['body'])
    )
    cursor.close()
    conn.commit()
    return {
        "status": True
    }


# DELETE


@app.route('/api/article/<int:art_id>', methods=['DELETE'])
def del_article_by_id(art_id):
    conn = psycopg2.connect(dbname='postgres', user='rust',
                            password='rust', host='localhost')
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "DELETE FROM articles WHERE id = {};".format(art_id)
    )
    cursor.close()
    conn.commit()
    return {
        "status": True
    }


# POST


@app.route('/api/article/', methods=['POST'])
def update_article():
    for line in request.form:
        print(line)

    conn = psycopg2.connect(dbname='postgres', user='rust',
                            password='rust', host='localhost')
    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute(
        "UPDATE articles SET head = '{}', body = '{}' where id = {};".format(
            request.form['head'], request.form['body'], int(request.form['id']))
    )
    cursor.close()
    conn.commit()
    return {
        "status": True
    }

