from flask import Flask, request, jsonify , render_template
from flask_cors import CORS

app = Flask(__name__ , template_folder='.' , static_folder='.' , static_url_path='/')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template('index.html')



if __name__ == '__main__':
    print('Starting server...')
    app.run(port=8000 , host='0.0.0.0')
    # app.run(ipaddress=')
    print('Server Stopped....')
