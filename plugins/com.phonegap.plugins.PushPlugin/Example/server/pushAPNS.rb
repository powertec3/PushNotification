require 'rubygems'
require 'pushmeup'


APNS.host = 'gateway.sandbox.push.apple.com' 
APNS.port = 2195 
APNS.pem  = 'developer_identity.pem'
APNS.pass = 'pass1234'

device_token = '<device token gleaned from xcode console>'
# APNS.send_notification(device_token, 'Hello iPhone!' )
APNS.send_notification(device_token, :alert => 'PushPlugin works!!', :badge => 1, :sound => 'beep.wav')
