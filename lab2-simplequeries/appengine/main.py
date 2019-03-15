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

class DelayHandler(webapp2.RequestHandler):
    colors = ['blue', 'green', 'yellow', 'red']
    def get(self):
        delay_secs = int(self.request.get("delay"))
        time.sleep(delay_secs)
        new_color = DelayHandler.colors.pop(0)
        DelayHandler.colors.append(new_color)
        reply_obj = {
            "color": new_color,
            "request_type": "GET",
        }
        self.response.headers["Content-Type"] = "application/json"
        self.response.write(json.dumps(reply_obj))

    def post(self):
        delay_secs = int(self.request.get("delay"))
        time.sleep(delay_secs)
        new_color = DelayHandler.colors.pop(0)
        DelayHandler.colors.append(new_color)
        reply_obj = {
            "color": new_color,
            "request_type": "POST",
        }
        self.response.headers["Content-Type"] = "application/json"
        self.response.write(json.dumps(reply_obj))


class MainHandler(webapp2.RequestHandler):
    def get(self):
        self.response.write(open("index.html").read())

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/send_delayed_response', DelayHandler),

], debug=True)

