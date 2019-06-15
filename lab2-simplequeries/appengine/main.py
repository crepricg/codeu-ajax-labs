#!/usr/bin/env python
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
import webapp2
import time
import json
import random

class DelayHandler(webapp2.RequestHandler):
    colors = [
      'blue', 'green', 'yellow', 'red',
      'olive', 'teal', 'purple', 'aqua', 'navy']
    def get(self):
        delay_msecs = int(self.request.get('delay'))
        time.sleep(delay_msecs/1000.0)
        new_color = random.choice(DelayHandler.colors)
        reply_obj = {
            'color': new_color,
            'request_type': "get",
            'delay_msecs': delay_msecs,
        }
        self.response.headers.add_header('Access-Control-Allow-Origin', '*')
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(reply_obj))

    def post(self):
        delay_msecs = int(self.request.get('delay'))
        time.sleep(delay_msecs/1000.0)
        new_color = random.choice(DelayHandler.colors)
        reply_obj = {
            'color': new_color,
            'request_type': 'post',
            'delay_msecs': delay_msecs,
        }
        self.response.headers.add_header('Access-Control-Allow-Origin', '*')
        self.response.headers['Content-Type'] = 'application/json'
        self.response.write(json.dumps(reply_obj))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(open('index.html').read())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/send_delayed_response', DelayHandler),

], debug=True)

